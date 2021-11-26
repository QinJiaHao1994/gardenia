import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/noMatch";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Home = lazy(() => import("./pages/home"));
const SignIn = lazy(() => import("./pages/signin"));
const SignUp = lazy(() => import("./pages/signup"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={
              <Suspense fallback={<></>}>
                <SignIn />
              </Suspense>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Suspense fallback={<></>}>
                <SignUp />
              </Suspense>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <Dashboard />
              </Suspense>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={NoMatch} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
