import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "../reducers/cameraSlice";
import imageReducer from "../reducers/ImageSlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
    app: imageReducer,
  },
});
