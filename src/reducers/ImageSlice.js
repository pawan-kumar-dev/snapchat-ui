import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "app",
  initialState: {
    selectedImage: null,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { login, logout, selectImage, resetImage } = imageSlice.actions;
export const selectSelectedImage = (state) => state.app.selectedImage;
export const selectUser = (state) => state.app.user;

export default imageSlice.reducer;
