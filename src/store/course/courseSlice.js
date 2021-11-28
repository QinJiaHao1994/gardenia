import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./courseApi";

export const fetchCoursesAsync = createAsyncThunk(
  "course/fetchCourses",
  async ({ id, role }) => {
    const courses = await api.setRole(role).getCourses(id);
    return courses;
  }
);

const initialState = {
  courses: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoursesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCoursesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCourses = (state) => state.course.courses;
export const selectStatus = (state) => state.course.status;

export default courseSlice.reducer;
