import React, { useEffect, useState } from "react";
import { Vortex } from "react-loader-spinner";
import "./index.css";

const EmployeeDetails = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const avatarStyle = {
    backgroundColor: randomColor,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.158:8000/employee/santosh.naruje@openskale.com"
        );

        const data = await response.json();

        setEmployeeData(data);
        setLoading(false);
        setShowProfile(true);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="employee-container d-flex flex-column">
      <header>
        <nav className="employee-navbar-container">
          <img
            className="company-logo-header"
            src="https://i.postimg.cc/kX5s4kWg/Openscale-Technologies-D6-CV.png"
            alt="logo"
          />
          {showProfile && (
            <p
              className="avatar"
              style={{ backgroundColor: `${avatarStyle.backgroundColor}` }}
            >
              {employeeData.first_name.charAt(0)}
            </p>
          )}
        </nav>
      </header>

      {loading ? (
        <div className="loader-container">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={[
              "#003480",
              "#97D7F7",
              "#003E84",
              "#97D7F7",
              "#003480",
              "#00ADEE",
            ]}
          />
        </div>
      ) : (
        <div className="d-flex flex-column">
        <div className="align-self-center m-3">
          <p className="display-bold">
            <span>NAME</span>
            {`: ${employeeData.first_name} ${employeeData.last_name}`}
          </p>
          <p className="display-bold">
            <span>EMPID</span>
            {`: ${employeeData.id}`}
          </p>
          <p className="display-bold">
            <span>EMAIL</span>
            {`: ${employeeData.email}`}
          </p>
          <p className="display-bold">
            <span>DEPARTMENT</span>
            {`: ${employeeData.department}`}
          </p>
          <p className="display-bold">
            <span>QUALIFICATIONS</span>
            {`: ${employeeData.qualifications}`}
          </p>
          <p className="display-bold">
            <span>DOB</span>
            {`: ${employeeData.date_of_birth}`}
          </p>
          <p className="display-bold">
            <span>GENDER</span>
            {`: ${employeeData.gender}`}
          </p>
          <p className="display-bold">
            <span>DESIGNATION</span>
            {`: ${employeeData.designation}`}
          </p>
          <p className="display-bold">
            <span>BLOOD_GROUP</span>
            {`: ${employeeData.blood_group}`}
          </p>
          <p className="display-bold">
            <span>JOININGDATE</span>
            {`: ${employeeData.joining_date}`}
          </p>
          <p className="display-bold">
            <span>DESIGNATION</span>
            {`: ${employeeData.designation}`}
          </p>
          <p className="display-bold">
            <span>ADDRESS:</span>
            {`: ${employeeData.address}`}
          </p>
          </div>
        
        
        <button className="back-to-home " type="button">Back to Home</button>
        </div>
       
      )}
    </div>
  );
};

export default EmployeeDetails;



