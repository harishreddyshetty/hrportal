import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import LoginForm from './Components/LoginForm';
// import ProtectedRoute  from "./Components/ProtectedRoute/ProtectedRoute";
import AllEmployees from "./Components/AllEmployees";
// import Test from "./Components/Test"
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />}/>
        <Route exact path="/allemployees" element={<AllEmployees />}/>
        {/* <Route exact path="/allemployees" element={<ProtectedRoute> <AllEmployees /></ProtectedRoute>} />
         */}
      </Routes>
    </Router>

  );
}

export default App;