import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'maps',
  initialState: {
    // Set Map Camera Position
    cameraPosition: [],
  },
  reducers: {
    setCameraPosition(state, action) {
      state.cameraPosition = action.payload;
    }
  },
});

export { actions as mapsActions };
export { reducer as mapsReducer };
