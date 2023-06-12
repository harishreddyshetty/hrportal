import React, { useEffect, useState } from "react";
import LeaveForm from "../LeaveForm";
import LeaveHistoryTable from "../HistoryTable";
import { BsX } from "react-icons/bs";
import "./index.css";

const LeaveManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeBtn = () => {
    setIsModalOpen(false);
  };

  const leaveApplied = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="leave-management-container">
      <div className="widget-card-container">
        <div className="widget-card">
          <h1 className="leave-header">7</h1>
          <p>USED</p>
        </div>
        <div className="widget-card">
          <h1 className="leave-header">6</h1>
          <p>BALANCE</p>
        </div>
        <div className="widget-card">
          <h1 className="leave-header">12</h1>
          <p>TOTAL</p>
        </div>
      </div>
      <div className="leave-history-container">
        <div className="apply-btn-container">
          <button
            type="button"
            className="apply-leave-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Apply Leave
          </button>
        </div>
        {isModalOpen && (
        
          <div className="modal-container">
            <div className="close-btn-div">
              <BsX className="close-btn" onClick={closeBtn} />
            </div>
            <div className="form-container">
              <LeaveForm leaveApplied={leaveApplied} />
            </div>
          </div>
     
        )}
        <div>
          <LeaveHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
