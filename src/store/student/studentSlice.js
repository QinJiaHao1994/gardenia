import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStudents, getEnrolls } from "./studentApi";

export const fetchStudentsAndEnrollsAsync = createAsyncThunk(
  "student/fetchStudentsAndEnrolls",
  async (courseId) => {
    const [students, enrolls] = await Promise.all([
      getStudents(),
      getEnrolls(courseId),
    ]);
    const res = { students, enrolls };
    return res;
  }
);

const initialState = {
  students: [],
  enrolls: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addEnroll: (state, action) => {
      state.enrolls.push(action.payload);
    },
    removeEnroll: (state, action) => {
      const index = state.enrolls.findIndex(
        (enroll) => enroll.id === action.payload
      );
      state.enrolls.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsAndEnrollsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsAndEnrollsAsync.fulfilled, (state, action) => {
        const { students, enrolls } = action.payload;
        state.status = "succeeded";
        state.students = students;
        state.enrolls = enrolls;
      })
      .addCase(fetchStudentsAndEnrollsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addEnroll, removeEnroll } = studentSlice.actions;

export const selectStudents = (state) => state.student.students;
export const selectEnrolls = (state) => state.student.enrolls;
export const selectStatus = (state) => state.student.status;

export default studentSlice.reducer;
