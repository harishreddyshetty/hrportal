import React, { useState, useEffect } from "react";
import LeaveForm from "../LeaveForm";

import "./index.css";

const LeaveManagement = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [showBalance,setShowBalance]=useState(false);
  const [showUsed,setShowUsed]=useState(false)
  const [employee, setEmployee] = useState([]);
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const avatarStyle = {
    backgroundColor: randomColor,
  };
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendEndpoint}/employee/santosh.naruje@openskale.com`
        );

        const data = await response.json();
        setEmployee(data);
        setShowProfile(true);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const applyLeave = () => {
    setIsModalOpen(true);
  };

  const closeBtn = () => {
    setIsModalOpen(false);
  };

  const leaveApplied = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="employee-container">
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
              {"Santosh".charAt(0)}
            </p>
          )}
        </nav>
      </header>
      <div className="employee-container d-flex flex-column">
        <div className="d-flex flex-row justify-content-center flex-wrap">
          <button className="widget-btn" type="button">
            Leaves History
          </button>
          <div className="d-flex flex-column">
            <button
              onClick={() => setShowTotal(!showTotal)}
              className="widget-btn"
              type="button"
            >
              Total Leaves
            </button>
            {showTotal && <h1 className="text-center text-success">12</h1>}
          </div>

          <div className="d-flex flex-column">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="widget-btn"
              type="button"
            >
              Balance Leaves
            </button>
            {showBalance && <h1 className="text-center text-secondary">12</h1>}
          </div>
          <div className="d-flex flex-column">
            <button
              onClick={() => setShowUsed(!showUsed)}
              className="widget-btn"
              type="button"
            >
              Used Leaves
            </button>
            {showUsed && <h1 className="text-center text-secondary">0</h1>}
          </div>
            
         
          <button
            className="widget-btn"
            onClick={applyLeave}
            type="button"
          >
            Apply Leave
          </button>
        </div>
        {isModalOpen && (
          <div className="modal-container">
            <div className="close-btn-div">
              <button
                className="close-btn"
                onClick={closeBtn}
                type="button"
              >
                X
              </button>
            </div>
            <div className="form-container">
              <LeaveForm leaveApplied={leaveApplied} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;

