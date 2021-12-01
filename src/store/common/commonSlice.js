import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mergedLayout: {},
  drawerIndex: -1,
  drawerStatus: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLayout: (state, action) => {
      state.mergedLayout = action.payload;
    },
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

export const { setDrawerIndex, openDrawer, closeDrawer, setLayout } =
  commonSlice.actions;

export const selectMergedLayout = (state) => state.common.mergedLayout;
export const selectDrawerIndex = (state) => state.common.drawerIndex;
export const selectdrawerStatus = (state) => state.common.drawerStatus;

export default commonSlice.reducer;
