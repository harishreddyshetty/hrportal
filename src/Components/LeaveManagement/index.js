import React, { useEffect, useState } from "react";
import LeaveForm from "../LeaveForm";
import LeaveHistoryTable from "../LeaveHistoryTable";
import { BsX } from "react-icons/bs";
import "./index.css";
import LoadingView from "../LoadingView";
import FailureView from "../FailureView";
import { Navigate } from "react-router-dom";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};



const LeaveManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeBtn = () => {
    setIsModalOpen(false);
  };
  const [apiStatus,setApiStatus]=useState(apiStatusConstants.initial)

  const onClickRetry=()=> <Navigate to="/leave" />

  const leaveApplied = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {}, []);

const renderData=()=>{
  switch(apiStatus){
    case apiStatusConstants.initial:
      return <LoadingView />
    case apiStatusConstants.success:
      return "success function"  
    case apiStatusConstants.failure:
      return <FailureView onClickRetry={onClickRetry} />;
    default:
      return null;  
  }
}
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