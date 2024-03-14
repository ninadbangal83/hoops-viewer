import { createSlice } from "@reduxjs/toolkit";
const initialFeaturesSlice = {
  hideCount: 0,
  isIsolate: false,
  transparentCount: 0,
  isZoom: false,
};

console.log('featureslice')
// This is Context Menu features Slice.
// It consist functions for manipulating, storing the Context Menu features data.
const FeaturesSlice = createSlice({
  name: "features",
  initialState: initialFeaturesSlice,
  reducers: {
    hideCountInc(state) {
      state.hideCount = state.hideCount + 1;
    },
    hideCountInit(state) {
      state.hideCount = 0;
    },
    isolateToggle(state) {
      state.isIsolate = !state.isIsolate;
    },
    transparentCountInc(state) {
      state.transparentCount = state.transparentCount + 1;
    },
    transparentCountInit(state) {
      state.transparentCount = 0;
    },
    setZoom(state, isZoom) {
      state.isZoom = isZoom.payload;
    },
  },
});

export const featuresActions = FeaturesSlice.actions;
export default FeaturesSlice.reducer;
