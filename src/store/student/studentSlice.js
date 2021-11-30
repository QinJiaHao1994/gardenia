import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStudents, getEnrollIds } from "./studentApi";

export const fetchStudentsAndEnrollIdsAsync = createAsyncThunk(
  "student/fetchStudentsAndEnrollIds",
  async (courseId) => {
    const [students, enrollIds] = await Promise.all([
      getStudents(),
      getEnrollIds(courseId),
    ]);
    const res = { students, enrollIds };
    return res;
  }
);

const initialState = {
  students: [],
  enrollIds: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsAndEnrollIdsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentsAndEnrollIdsAsync.fulfilled, (state, action) => {
        const { students, enrollIds } = action.payload;
        state.status = "succeeded";
        state.students = students;
        state.enrollIds = enrollIds;
      })
      .addCase(fetchStudentsAndEnrollIdsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectStudents = (state) => state.student.students;
export const selectEnrollIds = (state) => state.student.enrollIds;
export const selectStatus = (state) => state.student.status;

export default studentSlice.reducer;
