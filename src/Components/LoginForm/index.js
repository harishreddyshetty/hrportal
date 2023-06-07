import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [errMsgDisplay, setErrMsgDisplay] = useState("Something Went Wrong");
<<<<<<< HEAD
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
=======
  const backendEndpoint=process.env.REACT_APP_BACKEND_ENDPOINT
>>>>>>> 4585445 (Created LeaveForm component)

  const navigate = useNavigate();

  const handleEmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("*required");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("*required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setEmailError("*required");
    }

    if (password.trim() === "") {
      setPasswordError("*required");
    }

    if (email.trim() !== "" && password.trim() !== "") {
      try {
        console.log(backendEndpoint)
        const response = await axios.post(
<<<<<<< HEAD
          `${backendEndpoint}/login`,
=======
          `${backendEndpoint}/authentication`,
>>>>>>> 4585445 (Created LeaveForm component)
          {
            email,
            password,
          }
        );

        console.log(response);


        if (response.status === 200) {
          const data = response.data;
          console.log(data,"data")
          const loginUserDetails = { email, 
            details: data.detail };
          localStorage.setItem(
            "loginDetails",
            JSON.stringify(loginUserDetails)
          );
          navigate("/");
        }
      } catch (error) {
        setErrMsg(true);
        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          setErrMsgDisplay(error.response.data.detail);
        }
      }
    }
  };

  

  return (
    <div className="login-page-container">
      <img
        className="login-page-image col-md-6 mr-0 ml-2"
        // src="https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?w=996&t=st=1685464014~exp=1685464614~hmac=ce2ee2463224bc20258cbb3d40d9637fac9287879bbaa90257e414e7ea32617a"
        src="https://i.ibb.co/dg3pd5W/communication-flat-icon-1262-18771.jpg"
      
        alt="loginImage"
      />

      <form onSubmit={handleSubmit} className="login-card  d-flex flex-column">
        <img
          className="company-logo"
          src="https://i.postimg.cc/kX5s4kWg/Openscale-Technologies-D6-CV.png"
          alt="logo"
        />

        <label className="labels" htmlFor="hrEmail">
          EMAIL
        </label>
        <input
          type="email"
          className={`${emailError && "is-invalid"} input-element`}
          placeholder="ENTER YOUR EMAIL"
          id="hrEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
        />
        {emailError && <p className="invalid-feedback">{emailError}</p>}

        <label className="labels" htmlFor="hrPassword">
          PASSWORD
        </label>
        <input
          type="password"
          className={`${passwordError && "is-invalid"} input-element`}
          id="hrPassword"
          placeholder="ENTER YOUR PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
        />
        {passwordError && <p className="invalid-feedback">{passwordError}</p>}

        {errMsg && <p className="err-msg-display mt-3">*{errMsgDisplay}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
