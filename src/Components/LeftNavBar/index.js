import { AiFillHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsFillPersonFill, BsFillEnvelopeCheckFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { BiMoney } from "react-icons/bi";
import { SlEnvelopeOpen } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import "./index.css";
import NavBarItems from "../NavBarItems";
import { useState } from "react";

const navItems = [
  { icon: <AiFillHome />, navItemName: "Home", path: "/" },
  { icon: <BsFillPersonFill />, navItemName: "Your Profile", path: "/profile" },
  {
    icon: <AiOutlineUsergroupAdd />,
    navItemName: "All employees",
    path: "/allemployees",
  },
  {
    icon: <BsFillEnvelopeCheckFill />,
    navItemName: "Leave Requests",
    path: "/leavesrequest",
  },
  { icon: <SlEnvelopeOpen />, navItemName: "Leaves", path: "/leave" },
  {
    icon: <BiMoney />,
    navItemName: "Salary Details",
    path: "/salarymanagment",
  },
];

const LeftNavBar = () => {
  const [menuClicked, setMenustatus] = useState(true);
  const allEmployees = "allEmployees";
  const onClickMenu = () => {
    setMenustatus(!menuClicked);
  };

  const navigate = useNavigate();

  const navBarWidth = menuClicked ? "expand-menu" : "collapse-menu";

  const onClickLogout = () => {
    navigate("/login");
    localStorage.removeItem("loginDetails")
  };

  return (
    <nav className={`left-nav-bar ${navBarWidth}`}>
      <ul className="list">
        <li
          style={{ marginLeft: menuClicked ? "200px" : "5px" }}
          className="hamburger-icon"
          onClick={onClickMenu}
        >
          <GiHamburgerMenu />
        </li>
        {navItems.map((eachItem, index) => (
          <NavBarItems
            key={index}
            navitemDetails={eachItem}
            allEmployees={eachItem.navItemName === allEmployees}
          />
        ))}
      </ul>

      <ul className="logout-container" >
        <hr className="" />

        <li className="d-flex align-items logout-list-item">
          <div className="nav-item-icon">
            <FiLogOut />
          </div>
          <button onClick={onClickLogout} className="logout-btn-nav">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNavBar;
