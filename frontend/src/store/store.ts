import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user.slice";
import loaderSlice from "./loader.slice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    loader: loaderSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
