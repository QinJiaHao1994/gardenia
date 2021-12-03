import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import NoMatch from "./pages/noMatch";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Home = lazy(() => import("./pages/home"));
const SignIn = lazy(() => import("./pages/signin"));
const SignUp = lazy(() => import("./pages/signup"));
const CreateCourse = lazy(() => import("./pages/createCourse"));
const EditCourseAuth = lazy(() => import("./pages/editCourse/EditCourseAuth"));
const EditCourse = lazy(() => import("./pages/editCourse/EditCourse"));
const CourseDetailAuth = lazy(() =>
  import("./pages/courseDetail/CourseDetailAuth")
);
const CourseDetailWrapper = lazy(() =>
  import("./pages/courseDetail/CourseDetailWrapper")
);
const CourseDetail = lazy(() => import("./pages/courseDetail/CourseDetail"));
const CourseEnroll = lazy(() => import("./pages/courseEnroll"));
const CourseDrive = lazy(() => import("./pages/courseDrive"));
const MarkdownPreview = lazy(() => import("./pages/markdownPreview"));
const Redirect = lazy(() => import("./pages/redirect"));

function App() {
  return (
    <Suspense
      fallback={
        <Stack spacing={4}>
          <Skeleton variant="rectangular" height={64} />
          <Skeleton variant="rectangular" height="calc(100vh - 100px)" />
        </Stack>
      }
    >
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="course" element={<CourseDetailAuth />}>
              <Route path=":courseId" element={<CourseDetailWrapper />}>
                <Route index element={<CourseDetail />} />
                <Route path="enroll" element={<CourseEnroll />} />
                <Route path="drive" element={<CourseDrive />} />
              </Route>
            </Route>
            <Route path="preview" element={<Outlet />}>
              <Route index element={<Redirect to="/" />} />
              <Route path=":mdId" element={<MarkdownPreview />} />
            </Route>
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course" element={<EditCourseAuth />}>
              <Route path=":courseId" element={<EditCourse />} />
            </Route>
          </Route>
          <Route path="*" element={NoMatch} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
