import React, { useCallback, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import MapView from '../map/core/MapView';
import MapCurrentLocation from '../map/MapCurrentLocation';
import MapPadding from '../map/MapPadding';
import { devicesActions } from '../store';
import MapDefaultCamera from '../map/main/MapDefaultCamera';
import MapOverlay from '../map/overlay/MapOverlay';
import Directions from '../map/directions/Directions';



const MainMap = () => {
  const theme = useTheme();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));


  return (
    <>
      <MapView>
        <MapOverlay />
        <MapDefaultCamera />
        <Directions/>
      </MapView>
      <MapCurrentLocation />
      {desktop && (
        <MapPadding left={parseInt(theme.dimensions.drawerWidthDesktop, 10)} />
      )}
    </>
  );
};

export default MainMap;
