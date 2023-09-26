import { useEffect } from 'react';
import { map } from '../core/MapView';
import { useSelector } from 'react-redux';

function calculateBearing(point1, point2) {
  console.log(point1, point2)
  const lat1 = (point1.lat * Math.PI) / 180;
  const lat2 = (point2.lat * Math.PI) / 180;
  const lon1 = (point1.lon * Math.PI) / 180;
  const lon2 = (point2.lon * Math.PI) / 180;

  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

  let initialBearing = Math.atan2(y, x);
  initialBearing = (initialBearing * 180) / Math.PI;
  initialBearing = (initialBearing + 360) % 360;

  return initialBearing;
}

const MapDefaultCamera = () => {

  const defaultLatitude = 33.909968
  const defaultLongitude = -6.9794782
  const defaultZoom = 0;

  const position = useSelector(state => state.maps.cameraPosition)

  

  useEffect(() => {
          const point1 = {
            lat: 33.909968,lon: -6.9794782
          }
          const point2 = {
            lat: 33.1953071,
            lon:-8.5935188
          }
          // Change tilt (pitch) of the map
          map.setPitch(60); // Set the pitch to 45 degrees
          const bearingAngle = calculateBearing(point1, point2);
          // Change rotation (bearing) of the map
          map.setBearing(bearingAngle); // Set the bearing to 90 degrees
    
          if(position.length) {
            // Define the new camera parameters
            const newCameraParams = {
              center: [-74.006, 40.7128], // New center coordinates (longitude, latitude)
              zoom: 12, // New zoom level
              pitch: 45, // New pitch (tilt) angle in degrees
              bearing: 90 // New bearing (rotation) angle in degrees
            };

            // Define animation options (optional)
            const animationOptions = {
              duration: 2000, // Animation duration in milliseconds
              easing: (t) => t, // Easing function (linear easing in this example)
            };

            // Use the flyTo method to smoothly transition to the new camera parameters
            map.flyTo(newCameraParams, animationOptions);
          } else {
            map.jumpTo({
              center: [defaultLongitude, defaultLatitude],
              zoom: Math.max(map.getZoom(), 10),
            },);
          }
          
  }, [defaultLatitude, defaultLongitude, defaultZoom, position]);

  return null;
};

export default MapDefaultCamera;
