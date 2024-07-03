import { createSlice } from "@reduxjs/toolkit";

export interface LoaderInitialState {
  loadingState: boolean;
}

const initialState: LoaderInitialState = {
  loadingState: false,
};

const loaderSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    turnOnLoader: (state) => {
      state.loadingState = true;
    },
    turnOffLoader: (state) => {
      state.loadingState = false;
    },
  },
});

export const { turnOnLoader, turnOffLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
