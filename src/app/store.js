import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import cameraReducer from "../reducers/cameraSlice";
import imageReducer from "../reducers/ImageSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    camera: cameraReducer,
    app: imageReducer,
  },
});
