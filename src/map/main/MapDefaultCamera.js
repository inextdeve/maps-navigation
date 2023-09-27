import { useEffect } from "react";
import { map } from "../core/MapView";
import { useSelector } from "react-redux";

function calculateBearing(point1, point2) {
  console.log(point1, point2);
  const lat1 = (point1.lat * Math.PI) / 180;
  const lat2 = (point2.lat * Math.PI) / 180;
  const lon1 = (point1.lon * Math.PI) / 180;
  const lon2 = (point2.lon * Math.PI) / 180;

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

  let initialBearing = Math.atan2(y, x);
  initialBearing = (initialBearing * 180) / Math.PI;
  initialBearing = (initialBearing + 360) % 360;

  return initialBearing;
}

const arrToObjPosition = (arr) => {
  if (arr.length < 2) {
    throw new Error("arrToObjPosition(): Invalid arr");
  }
  return { lat: arr[0], lon: arr[1] };
};

const MapDefaultCamera = () => {
  const defaultLatitude = 26.9843869;
  const defaultLongitude = 49.2185405;
  const defaultZoom = 0;

  const { currentPosition, targetPosition } = useSelector(
    (state) => state.maps
  );

  useEffect(() => {
    if (currentPosition.length && targetPosition.length) {
      const bearingAngle = calculateBearing(
        arrToObjPosition(currentPosition),
        arrToObjPosition(targetPosition)
      );

      // Define the new camera parameters
      const newCameraParams = {
        center: currentPosition, // New center coordinates (longitude, latitude)
        zoom: 12, // New zoom level
        pitch: 55, // New pitch (tilt) angle in degrees
        bearing: bearingAngle, // New bearing (rotation) angle in degrees
      };

      // Define animation options (optional)
      const animationOptions = {
        duration: 2000, // Animation duration in milliseconds
        easing: (t) => t, // Easing function (linear easing in this example)
      };

      // Use the flyTo method to smoothly transition to the new camera parameters
      map.flyTo(newCameraParams, animationOptions);
    } else if (currentPosition.length) {
      map.jumpTo({
        center: currentPosition,
        zoom: Math.max(map.getZoom(), 10),
      });
    } else {
      map.jumpTo({
        center: [defaultLongitude, defaultLatitude],
        zoom: Math.max(map.getZoom(), 10),
      });
    }
  }, [defaultLatitude, defaultLongitude, defaultZoom, currentPosition]);

  return null;
};

export default MapDefaultCamera;
