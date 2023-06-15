import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import LoginForm from './Components/LoginForm';
import ProtectedRoute  from "./Components/ProtectedRoute/ProtectedRoute";
import AllEmployees from "./Components/AllEmployees";
import NotFoundRoute from "./Components/NotFoundRoute"
import Profile from "./Components/Profile"
import LeaveManagement from "./Components/LeaveManagement";
import LoadingView from "./Components/LoadingView";
import HomeRoute from "./Components/HomeRoute";
import LeftNavBar from "./Components/LeftNavBar";

import './App.css';





function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path="/login" element={<LoginForm />}/>
        {/* <Route exact path="/" element={<HomeRoute />} /> */}
        {/* <Route exact path="/allemployees" element={<AllEmployees />}/> */}
        <Route exact path="/allemployees" element={<ProtectedRoute> <AllEmployees /></ProtectedRoute>} />
        {/* <Route exact path="/employee" element={<ProtectedRoute>< EmployeeDetails/></ProtectedRoute>} /> */}
        <Route exact path="/" element={<Profile />} />
        <Route exact path="/leave" element={<LeaveManagement />} />
        <Route exact path="/test" element={<LeftNavBar />} />
        
        

        <Route path="*" element={<NotFoundRoute />}/>
      </Routes>
    </Router>

  );
}

export default App