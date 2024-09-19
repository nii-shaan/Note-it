import { createSlice } from "@reduxjs/toolkit";

export interface INITIALSTATE {
  settingOpenStatus: boolean
}

const initialState: INITIALSTATE = {
  settingOpenStatus: false
}

const SettingSlice = createSlice({
  name: "SettingSlice",
  initialState,
  reducers: {
    openSetting: (state) => {
      state.settingOpenStatus = true
    },
    closeSetting: (state) => {
      state.settingOpenStatus = false
    }
  }
})

export default SettingSlice.reducer;
export const { openSetting, closeSetting } = SettingSlice.actions;

