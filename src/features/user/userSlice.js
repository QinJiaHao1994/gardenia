import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
});

export const selectUser = (state) => state.user.user;
// export const selectIsLoading = (state) => state.user.status === "loading";

export default userSlice.reducer;
