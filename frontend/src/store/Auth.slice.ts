import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  isLoggedIn: boolean;
}
const initialState: InitialState = {
  isLoggedIn: false,
};
const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});


export default AuthSlice.reducer;
export const { login, logout } = AuthSlice.actions;
