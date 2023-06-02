import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [errMsgDisplay, setErrMsgDisplay] = useState("");

  const navigate = useNavigate();

  // const handleEmailBlur = () => {
  //   if (email.trim() === '') {
  //     setEmailError('*required');
  //   } else {
  //     setEmailError('');
  //   }
  // };

  // const handlePasswordBlur = () => {
  //   if (password.trim() === '') {
  //     setPasswordError('*required');
  //   } else {
  //     setPasswordError('');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setEmailError("*required");
    }

    if (password.trim() === "") {
      setPasswordError("*required");
    }

    try {
      // const response = await axios.post(
      //   "http://192.168.0.158:8000/authentication",
      //   {
      //     email,
      //     password,
      //     // role:"hr"
      //   }
      // );

      const options = {
        method:"post",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({email,password})
      }

      const response = await fetch("http://192.168.0.158:8000/authentication",options);

      console.log(response);

      const data = await response.json();
      
      console.log(data, "data");

      if (response.status === 200) {
        localStorage.setItem("email", JSON.stringify(email));
        navigate("/allemployees");
      }
    } catch (error) {
      setErrMsg(true);
      if (error.response && error.response.data && error.response.data.detail) {
        setErrMsgDisplay(error.response.data.detail);
      }
    }
  };

  return (
    <div className="login-page-container  d-flex justify-content-center align-items-center">
      <img
        className="login-page-image col-md-6 mr-0 ml-5"
        src="https://img.freepik.com/free-vector/communication-flat-icon_1262-18771.jpg?w=996&t=st=1685464014~exp=1685464614~hmac=ce2ee2463224bc20258cbb3d40d9637fac9287879bbaa90257e414e7ea32617a"
        alt="hrimage"
      />

      <form
        onSubmit={handleSubmit}
        className="login-card  d-flex flex-column col-md-6 "
      >
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
          // onBlur={handleEmailBlur}
        />
        {emailError && <p className="invalid-feedback">{emailError}</p>}

        <label className="labels" htmlFor="hrPassword">
          PASSWORD
        </label>
        <input
          type="password"
          className={`${emailError && "is-invalid"} input-element`}
          id="hrPassword"
          placeholder="ENTER YOUR PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // onBlur={handlePasswordBlur}
        />
        {passwordError && <p className="invalid-feedback">{passwordError}</p>}

        {errMsg && <p className="err-msg-display">*{errMsgDisplay}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
