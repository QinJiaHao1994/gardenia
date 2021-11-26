import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/noMatch";
import Dashboard from "./pages/dashboard";
// const Dashboard = lazy(() => import("./pages/dashboard"));
const Home = lazy(() => import("./pages/home"));
const SignIn = lazy(() => import("./pages/signin"));
const SignUp = lazy(() => import("./pages/signup"));

function App() {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="create-course" element={<Home />} />
          </Route>
          <Route path="*" element={NoMatch} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
