import React, { useEffect, useState } from "react";
import LoadingView from "../LoadingView";
import "./index.css";
import FailureView from "../FailureView";
import Header from "../Header";
import LeftNavBar from "../LeftNavBar";
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
    fetchData(); // eslint-disable-next-line
  }, [backendEndpoint]);

  const fetchData = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
      const jwtToken = loginDetails.details.jwt_token;
      const id=loginDetails.details.response.id
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application-json",
          Authorization: `bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        `${backendEndpoint}/employee/${id}`,
        options
      );
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const updatedData = {
          firstName: data.first_name,
          lastName: data.last_name,
          id: data.id,
          dob: data.date_of_birth,
          qualifications: data.qualifications,
          department: data.department,
          salary: data.salary,
          username: data.username,
          bloodGroup: data.blood_group,
          gender: data.gender,
          mobileNo: data.mobile_number,
          email: data.email,
          location: data.address,
          designation: data.designation,
          joiningDate: data.joining_date,
          role: data.role,
          address: data.address,
        };
        setEmployeeData(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      // console.error("Error fetching employee data:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };
  const onClickRetry = () => fetchData();

  const employeeProfile = () => {
    const {
      firstName,
      lastName,
      id,
      email,
      department,
      qualifications,
      dob,
      gender,
      bloodGroup,
      joiningDate,
      designation,
      address,
    } = employeeData;
    return (
      <>
        <Header />
          <div className="d-flex">
          <LeftNavBar />
          <div className="employee-container">
            <div>
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
                {`: ${email}`}
              </p>
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
              {/* <button className="back-to-home " type="button">
            Back to Home
          </button> */}
            </div>
          </div>
          </div>
      </>
    );
  };

  const renderContentData = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
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
