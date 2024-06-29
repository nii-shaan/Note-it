import { createSlice } from "@reduxjs/toolkit";

export interface InitialState {
  username: null | string;
  email: null | string;
  loggedIn: boolean;
}

const initialState: InitialState = {
  username: null,
  email: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.username = null;
      state.email = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
