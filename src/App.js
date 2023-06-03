import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import LoginForm from './Components/LoginForm';
// import ProtectedRoute  from "./Components/ProtectedRoute/ProtectedRoute";
import AllEmployees from "./Components/AllEmployees";
import NotFoundRoute from "./Components/NotFoundRoute"

import Test from "./Components/Test"
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />}/>
        <Route exact path="/allemployees" element={<AllEmployees />}/>
        {/* <Route exact path="/allemployees" element={<ProtectedRoute> <AllEmployees /></ProtectedRoute>} /> */}
        <Route exact path="/test" element={<Test />}/>
        <Route path="*" element={<NotFoundRoute />}/>
      </Routes>
    </Router>

  );
}

export default App;