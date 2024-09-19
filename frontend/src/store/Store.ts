import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth.slice";
import LoadingSlice from "./Loading.slice";
import SettingSlice from "./EditSetting"

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    loading: LoadingSlice,
    setting: SettingSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
