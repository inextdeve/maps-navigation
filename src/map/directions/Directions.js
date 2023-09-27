import { useEffect } from "react";
import { map } from "../core/MapView";
import { useSelector, useDispatch } from "react-redux";
import { mapsActions } from "../../store";

const Directions = () => {
  const dispatch = useDispatch();
  const {steps, currentPosition} = useSelector(state => state.maps);

  useEffect(() => {
    if (!currentPosition.length || !steps.length) return;

    //Route Layer Function here
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });

    map.addLayer({
      id: "route-line",
      type: "line",
      source: "route",

      paint: {
        "line-color": "hsl(205, 100%, 50%)",
        "line-width": 4,
        "line-opacity": 0.6,
      },
    });
    
    // Solve the route
    arcgisRest
      .solveRoute({
        stops: [currentPosition, ...steps],
        endpoint:
          "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
        authentication:
          "AAPK2f4f1b207d524e85b16b8c2ff970100666dtdMlpUL9GDkg3iIfyobg2sRFZ5r6LBBeNeJnsTjkNrsiJ20ZwsY22a-7bEPSL",
      })

      .then((response) => {
        // Next step is the next position after the current position used for calculating camera position
        const nextStep = response.routes.geoJson.features[0].geometry.coordinates[0][1];
        
        dispatch(mapsActions.setNextStep(nextStep || []));

        map.getSource("route").setData(response.routes.geoJson);
      })

      .catch((error) => {
        console.error(error);
        alert(
          "There was a problem using the route service."
        );
      });
      return (() => {
        map.removeLayer("route-line");
        map.removeSource("route");
      });
  }, [steps]);
  return null;
};

export default Directions;
