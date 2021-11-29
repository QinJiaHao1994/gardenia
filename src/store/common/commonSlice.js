import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerIndex: -1,
  drawerStatus: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setDrawerIndex: (state, action) => {
      state.drawerIndex = action.payload;
    },
    openDrawer: (state) => {
      state.drawerStatus = true;
    },
    closeDrawer: (state) => {
      state.drawerStatus = false;
    },
  },
});

export const { setDrawerIndex, openDrawer, closeDrawer } = commonSlice.actions;

export const selectDrawerIndex = (state) => state.common.drawerIndex;
export const selectdrawerStatus = (state) => state.common.drawerStatus;

export default commonSlice.reducer;
