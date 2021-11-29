import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import courseReducer from "./course/courseSlice";
import commonReducer from "./common/commonSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    course: courseReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
