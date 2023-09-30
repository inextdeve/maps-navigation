import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "maps",
  initialState: {
    steps: [],
    // Set Map Camera Position
    currentPosition: [],
    // Next step is the next pos[lng, lat] after current is used for adapting the camera of the map
    nextStep: [],
  },
  reducers: {
    setCurrentPosition(state, action) {
      state.currentPosition = action.payload;
    },
    setNextStep(state, action) {
      state.nextStep = action.payload;
    },
    setSteps(state, action) {
      state.steps = action.payload;
    },
  },
});

export { actions as mapsActions };
export { reducer as mapsReducer };
