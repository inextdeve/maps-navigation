import { createSlice } from "@reduxjs/toolkit";

const { reducer, actions } = createSlice({
  name: "maps",
  initialState: {
    // Set Map Camera Position
    currentPosition: [],
  },
  reducers: {
    setCurrentPosition(state, action) {
      state.currentPosition = action.payload;
    },
  },
});

export { actions as mapsActions };
export { reducer as mapsReducer };
