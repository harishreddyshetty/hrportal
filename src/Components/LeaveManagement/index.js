import React, { useState } from "react";
import LeaveForm from "../LeaveForm";

import "./index.css";

const LeaveManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setIsModalOpen(false);
  };

  const handleApplyLeaveClick = () => {
    setActiveButton("apply");
    setIsModalOpen(true)
  };



  const renderContent = () => {
    switch (activeButton) {
      case "history":
        return (
          <div className="leave-history-container">
            <div className="close-btn-div">
              <button className="close-btn" onClick={closeBtn} type="button">
                X
              </button>
            </div>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>NO OF LEAVE DAYS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8/4/2022</td>
                  <td>8/4/2022</td>
                  <td>1</td>
                  <td>Pending</td>
                </tr>
                {/* Rest of the table rows */}
              </tbody>
            </table>
          </div>
        );
      case "total":
        return <h1 className="leave-header">12</h1>;
      case "balance":
        return <h1 className="leave-header">12</h1>;
      case "used":
        return <h1 className="leave-header">0</h1>;
      default:
        return null;
    }
  };

  const closeBtn = () => {
    setIsModalOpen(false);
    setActiveButton(null)
  };

  const leaveApplied = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="leave-container">
      {/* Header and other content */}
      <div>
        <div className="d-flex flex-row justify-content-center flex-wrap">
          <div >
            <button
              onClick={() => handleButtonClick("history")}
              className={`widget-btn ${
                activeButton === "history" ? "active" : ""
              }`}
              type="button"
            >
              Leaves History
            </button>
          </div>
          <div className="d-flex flex-column">
            <button
              onClick={() => handleButtonClick("total")}
              className={`widget-btn ${
                activeButton === "total" ? "active" : ""
              }`}
              type="button"
            >
              Total Leaves
            </button>
          </div>

          <div className="d-flex flex-column">
            <button
              onClick={() => handleButtonClick("balance")}
              className={`widget-btn ${
                activeButton === "balance" ? "active" : ""
              }`}
              type="button"
            >
              Balance Leaves
            </button>
          </div>
          <div className="d-flex flex-column">
            <button
              onClick={() => handleButtonClick("used")}
              className={`widget-btn ${activeButton === "used" ? "active" : ""}`}
              type="button"
            >
              Used Leaves
            </button>
          </div>

          <button
            className={`widget-btn ${
              activeButton === "apply" ? "active" : ""
            }`}
            onClick={handleApplyLeaveClick}
            type="button"
          >
            Apply Leave
          </button>
        </div>
        {isModalOpen && (
          <div className="modal-container">
            <div className="close-btn-div">
              <button className="close-btn" onClick={closeBtn} type="button">
                X
              </button>
            </div>
            <div className="form-container">
              <LeaveForm leaveApplied={leaveApplied} />
            </div>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default LeaveManagement;