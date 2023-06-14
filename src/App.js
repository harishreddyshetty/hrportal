import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AllEmployees from "./Components/AllEmployees";
import NotFoundRoute from "./Components/NotFoundRoute";
import HomeRoute from "./Components/HomeRoute";
import LeaveRequestsRoute from "./Components/LeaveRequestsRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <HomeRoute />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/allemployees"
          element={
            <ProtectedRoute>
              <AllEmployees />
            </ProtectedRoute>
          }
        />
        <Route exact path="/leavesrequest" element={<LeaveRequestsRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
