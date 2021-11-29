import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./courseApi";

export const fetchCoursesAsync = createAsyncThunk(
  "course/fetchCourses",
  async () => {
    const courses = await api.getCourses();
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
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    setCourse: (state, action) => {
      const { id, diffData } = action.payload;
      const course = state.courses.find((course) => course.id === id);
      Object.assign(course, diffData);
    },
  },
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

export const { setCourse, addCourse } = courseSlice.actions;

export const selectCourses = (state) => state.course.courses;
export const selectCourseById = (state, courseId) =>
  state.course.courses.find((course) => course.id === courseId);
export const selectStatus = (state) => state.course.status;

export default courseSlice.reducer;
