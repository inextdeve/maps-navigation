import React from "react";
import { makeStyles } from "@mui/styles";
import MainMap from "./MainMap";
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
