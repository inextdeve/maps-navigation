import maplibregl from 'maplibre-gl';
import { useEffect } from 'react';
import { map } from './core/MapView';
import { useDispatch } from 'react-redux';
import { mapsActions } from '../store';

const MapCurrentLocation = () => {
  const dispatch = useDispatch();
  const setCurrentPosition = (position) => dispatch(mapsActions.setCurrentPosition(position))

  useEffect(() => {
    const geolocate  = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
        timeout: 5000,
      },
      trackUserLocation: true,
    });

    map.addControl(geolocate );
    map.on('load', function() {
      // Find the user location it automatically on load
      geolocate.trigger();
    });
    geolocate.on("geolocate", (event) => {
      setCurrentPosition([event.coords.longitude, event.coords.latitude]);
    });
    return () => map.removeControl(geolocate);
  }, []);

  return null;
};

export default MapCurrentLocation;
