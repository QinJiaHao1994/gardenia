import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import parseFiles from "./parseFiles";
import { getFiles } from "./driveApi";
import { selectCourseById } from "../course/courseSlice";

export const fetchDriveAsync = createAsyncThunk(
  "drive/fetchDrive",
  async (courseId, { getState }) => {
    const course = selectCourseById(getState(), courseId);
    const files = await getFiles(courseId);
    files.push({
      id: "0",
      name: course.code,
    });
    return files;
  }
);

const initialState = {
  fileDict: null,
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
      console.log();
      state.fileDict[id].name = name;
    },
    add: (state, action) => {},
    remove: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriveAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDriveAsync.fulfilled, (state, action) => {
        const fileDict = parseFiles(action.payload);
        const { id, name } = fileDict.get("0");
        const defaultPath = [{ id, name }];
        state.defaultPath = defaultPath;
        const data = {};
        fileDict.forEach((value, key) => (data[key] = value));
        state.fileDict = data;
      })
      .addCase(fetchDriveAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { rename, add, remove } = driveSlice.actions;

export const selectStatus = (state) => state.drive.status;
export const selectFileDict = (state) => state.drive.fileDict;
export const selectDefaultPath = (state) => state.drive.defaultPath;

export default driveSlice.reducer;
