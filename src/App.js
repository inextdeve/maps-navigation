import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CachingController from "./CachingController";
import { useEffectAsync } from "./reactHelper";
import { sessionActions } from "./store";

const useStyles = makeStyles(() => ({
  page: {
    flexGrow: 1,
    overflow: "auto",
  },
  menu: {
    zIndex: 4,
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newServer = useSelector((state) => state.session.server.newServer);
  const initialized = useSelector((state) => !!state.session.user);

  useEffectAsync(async () => {
    if (!initialized) {
      const response = await fetch("http://s1.rcj.care/api/session");
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else if (newServer) {
        navigate("/navigation/register");
      } else {
        navigate("/navigation/login");
      }
    }
    return null;
  }, [initialized]);

  return !initialized ? (
    <LinearProgress />
  ) : (
    <>
      <CachingController />
      <div className={classes.page}>
        <Outlet />
      </div>
    </>
  );
};

export default App;
