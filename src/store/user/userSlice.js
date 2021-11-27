import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userApi";

const initialState = {
  user: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUserAsync = createAsyncThunk("posts/fetchUser", getUser);

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
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { set } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
// export const selectIsLoading = (state) => state.user.status === "loading";

export default userSlice.reducer;
