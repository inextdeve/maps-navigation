import { useEffect } from "react";
import { map } from '../core/MapView';
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useAttributePreference } from '../../common/util/preferences';
import { useSelector, useDispatch } from "react-redux";
import { mapsActions } from "../../store";

/*
{ coordinates: [-6.9794782, 33.909968], approach: 'unrestricted' }, // Starting point Temara
                { coordinates: [-7.4300942, 33.6874444], approach: 'curb' }, // Waypoint 1
                { coordinates: [-7.669393, 33.5724032], approach: 'curb' }, // Waypoint 2
*/

// By default Lat, Lng
const stops = [[ 33.909968, -6.9794782], [ 33.6874444, -7.4300942,], [33.5724032,-7.669393], [33.3136606,-8.1676697], [33.2502693,-8.3348948], [33.2334864,-8.5242641], [33.1953071,-8.5935188]].map(i => i.reverse())
const Directions = () => {
  const mapboxAccessToken = useAttributePreference('mapboxAccessToken');
  const dispatch = useDispatch();

  const setCameraPosition = (payload) => dispatch(mapsActions.setCameraPosition(payload))

    useEffect(() => {
      //Point for the start
      map.addSource("start", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      //Point for the End
      map.addSource("end", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });
      //Add a layer of type circle for the start and end, connected to those sources. Use the circle-color paint property to make the start circle white and the end circle black.
      map.addLayer({
        id: "start-circle",
        type: "circle",
        source: "start",
        paint: {
          "circle-radius": 6,
          "circle-color": "white",
          "circle-stroke-color": "black",
          "circle-stroke-width": 2
        }
      });

      map.addLayer({
        id: "end-circle",
        type: "circle",
        source: "end",
        paint: {
          "circle-radius": 7,
          "circle-color": "black"
        }
      });

      map.getSource("start").setData({
        type: "Point",
        coordinates: [-6.9794782, 33.909968]
      });

      //Route Layer Function here
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",

        paint: {
          "line-color": "hsl(205, 100%, 50%)",
          "line-width": 4,
          "line-opacity": 0.6
        }
      });

      // Solve the route
      arcgisRest
          .solveRoute({
            stops,
            endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
            authentication: "AAPK2f4f1b207d524e85b16b8c2ff970100666dtdMlpUL9GDkg3iIfyobg2sRFZ5r6LBBeNeJnsTjkNrsiJ20ZwsY22a-7bEPSL"
          })

          .then((response) => {
            console.log(response.routes.geoJson.features[0].geometry.coordinates);

            let i = 0;
            const id = setInterval(() => {
              if (response.routes.geoJson.features[0].geometry.coordinates[0].length < 2) clearInterval(id)

              response.routes.geoJson.features[0].geometry.coordinates[0] = response.routes.geoJson.features[0].geometry.coordinates[0].slice(i)

              setCameraPosition(response.routes.geoJson.features[0].geometry.coordinates[0].slice(i)[0]);

              ++i
              
              map.getSource("route").setData(response.routes.geoJson);
            }, 500)


          })

          .catch((error) => {
            console.error(error);
            alert("There was a problem using the route service. See the console for details.");
          });

    } ,[]);
    return null
}

export default Directions;