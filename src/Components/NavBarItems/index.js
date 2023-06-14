import { Link } from "react-router-dom";
import "./index.css";

const NavBarItems = (props) => {
  const { navitemDetails } = props;
  const { icon, navItemName, path } = navitemDetails;

  

  const role = JSON.parse(localStorage.getItem("loginDetails")).details.response.role;
  // const role = "Employee";

  return (
    <>
      {role === "Employee" && (navItemName === "All employees" || navItemName === "Leave Requests") ? null : (
        <Link className="remove-underline" to={path}>
          <li className="d-flex nav-item-container align-items-center  mb-3">
            <div className="nav-item-icon">{icon}</div>

            <p className="mt-4">{navItemName}</p>
          </li>
        </Link>
      )}
    </>
  );
};

export default NavBarItems;
