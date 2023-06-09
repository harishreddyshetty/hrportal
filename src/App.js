import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AllEmployees from "./Components/AllEmployees";
import NotFoundRoute from "./Components/NotFoundRoute";
import HomeRoute from "./Components/HomeRoute";
// import Header from "./Components/Header"
import LeaveRequestsRoute from "./Components/LeaveRequestsRoute";
// import HrContext from "./HrContext/HrContext";
import Test from "./Components/Test";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        {/* <Route exact path="/" element={<HomeRoute />} /> */}
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <HomeRoute />
            </ProtectedRoute>
          }
        />
        {/* <Route exact path="/header" element={<Header/>}/> */}
        {/* <Route exact path="/" element={<ProtectedRoute><HomeRoute /></ProtectedRoute>}/> */}
        <Route exact path="/allemployees" element={<AllEmployees />} />
        {/* <Route exact path="/allemployees" element={<ProtectedRoute> <AllEmployees /></ProtectedRoute>} /> */}
        <Route exact path="/leavesrequest" element={<LeaveRequestsRoute />} />
        <Route exact path="/test" element={<Test/>} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
