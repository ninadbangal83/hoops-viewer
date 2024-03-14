import { configureStore } from "@reduxjs/toolkit";
import contextMenuReducer from "./contextMenu";
import featuresReducer from "./contextMenuFeatures";

// This is redux store to store data related to the context menu and its features.
console.log('sotre')
const store = configureStore({
  reducer: {
    contextMenu: contextMenuReducer,
    features: featuresReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
