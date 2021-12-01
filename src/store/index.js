import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common/commonSlice";
import userReducer from "./user/userSlice";
import courseReducer from "./course/courseSlice";
import studentReducer from "./student/studentSlice";
import driveReducer from "./drive/driveSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    course: courseReducer,
    student: studentReducer,
    drive: driveReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
