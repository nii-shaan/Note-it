import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  loadingStatus: boolean;
}

const initialState = {
  loadingStatus: false,
};

const LoadingSlice = createSlice({
  name: "LoadingSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loadingStatus = action.payload;
    },
  },
});

export default LoadingSlice.reducer;
export const { setLoading } = LoadingSlice.actions;
