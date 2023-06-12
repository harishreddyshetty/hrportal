import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AllEmployees from "./Components/AllEmployees";
import NotFoundRoute from "./Components/NotFoundRoute"
import Profile from "./Components/Profile"
import NotFoundRoute from "./Components/NotFoundRoute";
import HomeRoute from "./Components/HomeRoute";
import LeaveRequestsRoute from "./Components/LeaveRequestsRoute";
import LeaveManagement from "./Components/LeaveManagement";

import './App.css';
import LoadingView from "./Components/LoadingView";




import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />}/>
        {/* <Route exact path="/allemployees" element={<AllEmployees />}/> */}
        <Route exact path="/allemployees" element={<ProtectedRoute> <AllEmployees /></ProtectedRoute>} />
        {/* <Route exact path="/employee" element={<ProtectedRoute>< EmployeeDetails/></ProtectedRoute>} /> */}
        <Route exact path="/employee" element={<EmployeeDetails />} />
        <Route exact path="/leave" element={<LeaveManagement />} />
        <Route exact path="/test" element={<LeaveRequestsRoute />} />
        
        <Route path="*" element={<NotFoundRoute />}/>
      </Routes>
    </Router>
  );
}

export default App;
