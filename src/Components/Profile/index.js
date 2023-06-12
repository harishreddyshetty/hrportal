import React, { useEffect, useState } from "react";
import LoadingView from "../LoadingView";
import "./index.css";
import FailureView from "../FailureView";
import { Navigate } from "react-router-dom";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Profile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
        const jwtToken = loginDetails.details.jwt_token;
        console.log(jwtToken);
        const options = {
          method: "GET",
          headers: {
            Authorization: `bearer ${jwtToken}`,
          },
        };
        const response = await fetch(
          `${backendEndpoint}/employee/santosh.naruje@openskale.com`,
          options
        );
        if (response.status === 200) {
          const data = await response.json();
          setEmployeeData(data);
          setApiStatus(apiStatusConstants.success);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [backendEndpoint]);

  const onClickRetry = () => <Navigate to="/profile" />;

  const employeeProfile = () => {
  const {firstName,lastName,id,email,department,qualifications,dob,gender,bloodGroup,joiningDate,designation,address}=employeeData
  return (
    <div className="employee-container d-flex flex-column">
      <div className="d-flex flex-column">
        <div className="align-self-center m-3">
          <p className="display-bold">
            <span>NAME</span>
            {`: ${firstName} ${lastName}`}
          </p>
          <p className="display-bold">
            <span>EMPID</span>
            {`: ${id}`}
          </p>
          <p className="display-bold">
            <span>EMAIL</span>
            {`: ${email}`}</p>
          <p className="display-bold">
            <span>DEPARTMENT</span>
            {`: ${department}`}
          </p>
          <p className="display-bold">
            <span>QUALIFICATIONS</span>
            {`: ${qualifications}`}
          </p>
          <p className="display-bold">
            <span>DOB</span>
            {`: ${dob}`}
          </p>
          <p className="display-bold">
            <span>GENDER</span>
            {`: ${gender}`}
          </p>
          <p className="display-bold">
            <span>DESIGNATION</span>
            {`: ${designation}`}
          </p>
          <p className="display-bold">
            <span>BLOOD_GROUP</span>
            {`: ${bloodGroup}`}
          </p>
          <p className="display-bold">
            <span>JOININGDATE</span>
            {`: ${joiningDate}`}
          </p>
          <p className="display-bold">
            <span>DESIGNATION</span>
            {`: ${designation}`}
          </p>
          <p className="display-bold">
            <span>ADDRESS:</span>
            {`: ${address}`}
          </p>
        </div>

        <button className="back-to-home " type="button">
          Back to Home
        </button>
      </div>
    </div>
  )
  };

  const renderContentData = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return <LoadingView />;
      case apiStatusConstants.success:
        return employeeProfile();
      case apiStatusConstants.failure:
        return <FailureView onClickRetry={onClickRetry} />;
      default:
        return null;  
    }
  };
  return renderContentData();
};

export default Profile;
