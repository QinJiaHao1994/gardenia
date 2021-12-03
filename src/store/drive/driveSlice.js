import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFiles } from "./driveApi";
import { selectCourseById } from "../course/courseSlice";

export const fetchDriveAsync = createAsyncThunk(
  "drive/fetchDrive",
  async (courseId, { getState }) => {
    const course = selectCourseById(getState(), courseId);
    const files = await getFiles(courseId);
    files["0"] = {
      id: "0",
      name: course.code,
    };
    return files;
  }
);

const initialState = {
  files: null,
  defaultPath: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
};

export const driveSlice = createSlice({
  name: "drive",
  initialState,
  reducers: {
    rename: (state, action) => {
      const { id, name } = action.payload;
      state.files[id].name = name;
    },
    add: (state, action) => {
      const data = action.payload;
      state.files[data.id] = data;
    },
    remove: (state, action) => {
      delete state.files[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriveAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDriveAsync.fulfilled, (state, action) => {
        const files = action.payload;
        const { id, name } = files["0"];
        const defaultPath = [{ id, name }];
        state.defaultPath = defaultPath;
        state.files = files;
      })
      .addCase(fetchDriveAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { rename, add, remove } = driveSlice.actions;

export const selectStatus = (state) => state.drive.status;
export const selectFiles = (state) => state.drive.files;
export const selectDefaultPath = (state) => state.drive.defaultPath;

export default driveSlice.reducer;
