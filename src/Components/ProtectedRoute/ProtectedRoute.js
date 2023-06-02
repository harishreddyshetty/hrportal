import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem("email");
  console.log(email);
  return email ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;