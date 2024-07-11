import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth.slice";
import LoadingSlice from "./Loading.slice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    loading: LoadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
