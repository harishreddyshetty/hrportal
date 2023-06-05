import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const loginDetails = localStorage.getItem("loginDetails");
  return loginDetails ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;