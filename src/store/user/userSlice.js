import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userApi";
import courseApi from "../course/courseApi";

const initialState = {
  user: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUserAsync = createAsyncThunk("user/fetchUser", getUser);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        const user = action.payload;
        state.status = "succeeded";
        state.user = user;
        courseApi.setRole(user);
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { set } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectIsTeacher = (state) =>
  !!state.user.user && state.user.user.role === 0;
export const selectIsStudent = (state) =>
  !!state.user.user && state.user.user.role === 1;

export default userSlice.reducer;
