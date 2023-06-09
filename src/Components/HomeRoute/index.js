import { Link } from "react-router-dom";
import Header from "../Header"

import "./index.css";

const HomeRoute = () => {
  const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
  const roleDetails = loginDetails.details.role;

  return (

    <>
    <Header/>
  
    <div className="d-flex main-container justify-content-center align-items-center ">
      <div className="home-page-container">
        <div className="shadow details-container d-flex align-items-center justify-content-center">
          {roleDetails === "Admin" ? (
            <Link className="remove-underline" to="/allemployees">
              <h2>All Employees</h2>
            </Link>
          ) : (
            <Link to="/employee">
              <h2>Your Profile</h2>
            </Link>
          )}
        </div>

        <div className="shadow details-container d-flex align-items-center justify-content-center">
          {roleDetails === "Admin" ? (
            <Link to="/leavesrequest" className="remove-underline">
              <h2>Leave Requests</h2>
            </Link>
          ) : (
            <h2>Leave Managment</h2>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeRoute;
