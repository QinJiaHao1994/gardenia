import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/noMatch";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Home = lazy(() => import("./pages/home"));
const SignIn = lazy(() => import("./pages/signin"));
const SignUp = lazy(() => import("./pages/signup"));
const CreateCourse = lazy(() => import("./pages/createCourse"));
const EditCourse = lazy(() => import("./pages/editCourse"));
const CourseDetail = lazy(() => import("./pages/courseDetail"));

function App() {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="course/:courseId" element={<CourseDetail />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="edit-course/:courseId" element={<EditCourse />} />
          </Route>
          <Route path="*" element={NoMatch} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
