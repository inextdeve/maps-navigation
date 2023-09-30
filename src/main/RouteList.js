import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DirectionsIcon from "@mui/icons-material/Directions";
import fetcher from "../common/util/fetcher";
import { useEffectAsync } from "../reactHelper";
import { TOKEN, URL } from "../common/util/constants";
import { useDispatch } from "react-redux";
import { mapsActions } from "../store";

const useStyles = makeStyles((theme) => ({
  selectBoxContainer: {
    top: "20px",
    left: "1%",
    right: "70%",
    position: "absolute",
    display: "flex",
    gap: "0.5rem",
    background: "white",
    padding: "0.3rem 1rem",
    borderRadius: "0.5rem",
    zIndex: 1,
    opacity: 0.7,
    boxShadow: "0 0 2px rgb(0 0 0/20%), 0 -1px 0 rgb(0 0 0/2%)",
    transition: "all 300ms ease-in",
    [theme.breakpoints.down("md")]: {
      right: "8%",
    },
    "&:hover": {
      opacity: 1,
    },
  },
  selectBox: {
    width: "89%",
  },
  select: {},
  button: {
    aspectRatio: "1/1",
  },
}));

const RouteList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedRoute, setSelectedRoute] = useState({ id: "", name: "" });
  const [routes, setRoutes] = useState([]);
  const setSteps = (payload) => dispatch(mapsActions.setSteps(payload));

  useEffectAsync(async () => {
    try {
      const response = await fetcher(URL + "/api/routes", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();

      setRoutes(data.map((route) => ({ id: route.id, name: route.rout_code })));
    } catch (error) {
      console.log("Eror: => ", error);
    }
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetcher(
        URL + `/api/bins?routeid=${selectedRoute.id}&status=unempted`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      const data = await response.json();
      setSteps(data.map((item) => [item.longitude, item.latitude]));
    } catch (error) {}
  };

  return (
    <Box className={classes.selectBoxContainer}>
      <FormControl className={classes.selectBox}>
        <InputLabel>Routes</InputLabel>
        <Select
          label="Routes"
          variant="standard"
          className={classes.select}
          value={selectedRoute.id}
          onChange={(e) =>
            setSelectedRoute(
              () => routes.filter((route) => route.id === e.target.value)[0]
            )
          }
        >
          {routes.map((route) => (
            <MenuItem selected value={route.id} key={route.id}>
              {route.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton size="large" onClick={handleClick} className={classes.button}>
        <DirectionsIcon sx={{ color: "#1a73e8" }} />
      </IconButton>
    </Box>
  );
};

export default RouteList;
