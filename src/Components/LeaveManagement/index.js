import React, { useEffect, useState } from "react";
import LeaveForm from "../LeaveForm";
import LeaveHistoryTable from "../LeaveHistoryTable";
import { BsX } from "react-icons/bs";
import LoadingView from "../LoadingView";
import FailureView from "../FailureView";
import Header from "../Header";
import LeftNavBar from "../LeftNavBar";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const LeaveManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leavesData, setLeavesData] = useState([]);
  const closeBtn = () => {
    setIsModalOpen(false);
  };
  const [leaveCancel, setLeaveCancel] = useState(false);
  const [applyLeave,setApplyLeaved]=useState(false)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

  const onClickRetry = () => fetchLeavesCount();

  const leaveApplied = () => {
    setIsModalOpen(false);
    setApplyLeaved(!applyLeave)

  };



  const cancelLeave = () => {
    setLeaveCancel(!leaveCancel);
    console.log("leave cancelled called from history table");
  };

  useEffect(() => {
    console.log("Leave management entered")

    fetchLeavesCount(); // eslint-disable-next-line
  }, [applyLeave, leaveCancel]);

  const fetchLeavesCount = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    try {
      const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
      const id = loginDetails.details.response.id;
      const jwtToken=loginDetails.details.jwt_token;
      console.log(jwtToken)
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application-json",
          Authorization: `bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${backendEndpoint}/leaves_count/${id}`,options);
      if (response.status === 200) {
        setApiStatus(apiStatusConstants.success);
        const data = await response.json();
        const camelCaseData = {
          balanceLeaves: data.balance_leaves,
          totalLeaves: data.total_leaves,
          usedLeaves: data.used_leaves,
        };
        setLeavesData(camelCaseData);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const leavesComponent = () => {
    const { usedLeaves, balanceLeaves, totalLeaves } = leavesData;
    return (
      <>
      <Header />
      <div className="d-flex">
      
      <LeftNavBar />
      <div className="leave-management-container">
        <div className="widget-card-container">
          <div className="widget-card">
            <h1 className="leave-header">{usedLeaves}</h1>
            <p>USED</p>
          </div>
          <div className="widget-card">
            <h1 className="leave-header">{balanceLeaves}</h1>
            <p>BALANCE</p>
          </div>
          <div className="widget-card">
            <h1 className="leave-header">{totalLeaves}</h1>
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
          <LeaveHistoryTable leaveCancelled={cancelLeave} />

          </div>
        </div>
      </div>
      </div>
      </>
    );
  };
  const renderData = () => {
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return <LoadingView />;
      case apiStatusConstants.success:
        return leavesComponent();
      case apiStatusConstants.failure:
        return <FailureView onClickRetry={onClickRetry} />;
      default:
        return null;
    }
  };

  return renderData();
};

export default LeaveManagement;
