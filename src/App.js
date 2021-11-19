import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import NoMatch from "./pages/NoMatch";

const Dashboard = lazy(() => import("./pages/dashboard"));
const SignIn = lazy(() => import("./pages/signIn"));
const SignUp = lazy(() => import("./pages/signUp"));

function App() {
  return (
    <div className="App">
      <>
        <CssBaseline />
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
            ></Route>
            <Route path="*" element={NoMatch} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
