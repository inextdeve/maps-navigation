import React, { useState, useCallback, useEffect } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
// import DeviceList from "./DeviceList";
// import BottomMenu from "../common/components/BottomMenu";
// import StatusCard from "../common/components/StatusCard";
// import { devicesActions, mapsActions } from "../store";
import usePersistedState from "../common/util/usePersistedState";
// import EventsDrawer from "./EventsDrawer";
// import useFilter from "./useFilter";
// import MainToolbar from "./MainToolbar";
import MainMap from "./MainMap";
// import { useAttributePreference } from "../common/util/preferences";
import RouteList from "./RouteList";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RouteList />
      <MainMap />
    </div>
  );
};

export default MainPage;
