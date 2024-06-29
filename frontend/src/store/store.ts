import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./user.slice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
