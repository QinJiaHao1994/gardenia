import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import courseReducer from "./course/courseSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
