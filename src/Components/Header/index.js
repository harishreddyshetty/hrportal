// import {withRouter} from "react-router-dom"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill, BsFillPersonFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
// import HrContext from "../../HrContext/HrContext.js";


// import Popup from "reactjs-popup";

const Header = (props) => {
  const [profileclicked, setIsProfileCLickPopup] = useState(false);
  // const hist = () =>{
  //     const {match} = this.props
  //     console.log(match)
  // }

//  const ContextData = useContext(HrContext)
  

  const navigate = useNavigate();

  const onClickProfile = () => {
    setIsProfileCLickPopup((prevState) => !prevState);
    console.log("profile Clicked");
  };

  const onClickLogout = () => {
    localStorage.removeItem("loginDetails");
    navigate("/login");
  };

  const profilePopup = () => {
    return (
      <div className="">
        <Link to="/employee">
        <p className="mb-0">Your Profile</p>
        </Link>
        
        <button className="logout-btn mt-0" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    );
  };

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          className="company-logo-header"
          src="https://i.postimg.cc/kX5s4kWg/Openscale-Technologies-D6-CV.png"
          alt="logo"
        />
      </Link>

      <div className="header-elements-right">

        <button
          //   onClick={openPopup}
          className="add-employee-icon-btn d-flex justify-content-center align-items-center d-md-none"
        >
          <BsFillPersonPlusFill className="add-employee-icon" />
        </button>

        {/* onClick={onClickLogout} */}
        <button className="logout-icon-btn d-flex justify-content-center align-items-center d-md-none">
          <RiLogoutCircleRLine className="add-employee-icon" />
        </button>

        {/* onClick={onClickProfile} */}

        <button onClick={onClickProfile} className="profile-icon-container">
          <BsFillPersonFill size="30px" color="white" />
        </button>
      </div>
      <div id="optionsPopup">
        {profileclicked && (
          <div className="popup-overlay-profile d-flex justify-content-end ">
            <div className="popup-content-profile">{profilePopup()}</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
