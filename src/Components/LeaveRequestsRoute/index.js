import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import "./index.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Header from "../Header";
import LeftNavBar from "../LeftNavBar";

// const apiStatusConstants = {
//   initial: "INITIAL",
//   success: "SUCCESS",
//   failure: "FAILURE",
//   inProgress: "IN_PROGRESS",
// };

const LeaveRequestsRoute = () => {
  const [leavesReqData, setLeavesReqData] = useState([]);
  const [leavesHistoryData, setLeavesHistoryData] = useState([]);
  // const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [rejectClicked, setReject] = useState(false);
  const [rejectedReason, setRejectReason] = useState("");
  const [rowData, setRowData] = useState({});

  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

  const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
  const jwtToken = loginDetails.details.jwt_token;

  useEffect(() => {
    getLeavesReqData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getLeavesHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLeavesReqData = async () => {
    // setApiStatus(apiStatusConstants.inProgress)

    const url = `${backendEndpoint}/pending_leaves`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      // console.log(data,"data");

      setLeavesReqData(data);
      const updatedData = data.map((eachItem) => ({
        leaveId: eachItem.leave_id,
        days: eachItem.days,
        employeeEmail: eachItem.employee_email,
        employeeId: eachItem.employee_id,
        endDate: eachItem.end_date,
        hrEmail: eachItem.hr_email,
        leaveReason: eachItem.leave_reason,
        rejectedReason: eachItem.rejected_reason,
        startDate: eachItem.start_date,
        status: eachItem.status,
        firstName: eachItem.first_name,
        lastName: eachItem.last_name,
      }));
      setLeavesReqData(updatedData);
      // setApiStatus(apiStatusConstants.success);
    }
  };

  const getLeavesHistory = async () => {
    const url = `${backendEndpoint}/all_leaves_history`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const updatedHistoryData = data.map((eachItem) => ({
        days: eachItem.days,
        employeeEmail: eachItem.employee_email,
        employeeId: eachItem.employee_id,
        endDate: eachItem.end_date,
        hrEmail: eachItem.hr_email,
        leaveReason: eachItem.leave_reason,
        rejectedReason: eachItem.rejected_reason,
        startDate: eachItem.start_date,
        status: eachItem.status,
      }));

      setLeavesHistoryData(updatedHistoryData);
    }
  };

  const onClickApprove = (params) => {
    sendAcceptedStatus(params);
  };

  const sendAcceptedStatus = async (params) => {
    const EmpLeaveId = params.data.leaveId;
    console.log(params.data);
    console.log(EmpLeaveId, "leaveId");

    const url = `${backendEndpoint}/leave_status/${EmpLeaveId}`;

    const options = {
      method: "PUT",
      body: JSON.stringify({
        status: "Accepted",
        rejected_reason: params.data.rejectedReason,
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);
    console.log(response);
  };

  const sendRejectStatus = async () => {
    const leaveId = rowData.leaveId;
    const url = `${backendEndpoint}/leave_status/${leaveId}`;

    console.log({
      leave_id: rowData.leaveId,
      rejected_reason: rejectedReason,
      status: rowData.status,
    });

    const options = {
      method: "PUT",
      body: JSON.stringify({
        leave_id: rowData.leaveId,
        rejected_reason: rejectedReason,
        status: rowData.status,
      }),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    console.log(response, "response for rejected");
  };

  const onClickReject = (params) => {
    const rowData = params.data;
    console.log({ ...rowData, status: "Rejected" });
    setRowData({ ...rowData, status: "Rejected" });
    setReject(true);
  };

  const onClickSubmitReson = (event) => {
    event.preventDefault();
    setReject(false);
    setRejectReason("");
    sendRejectStatus();
  };

  const onClickClose = () => {
    setReject(false);
  };

  const onChangeReason = (e) => {
    setRejectReason(e.target.value);
    setRowData({ ...rowData, rejectedReason: e.target.value });
  };

  const onClickRejectPopup = () => (
    <form onSubmit={onClickSubmitReson}>
      <div className="d-flex justify-content-between">
        <label className="reason-label" htmlFor="reasonInput">
          Reason*
        </label>
        <button onClick={onClickClose} className="close-btn">
          <BsX className="close-icon" />
        </button>
      </div>

      <input
        required
        onChange={onChangeReason}
        className="reason-input"
        id="reasonInput"
        type="text"
      />
      <button className="submit-reason-btn" type="submit">
        Submit
      </button>
    </form>
  );

  const columns = [
    { name: "Id", field: "leaveId" },
    { name: "Emp Id", field: "employeeId" },

    {
      headerName: "NAME",
      valueGetter: function (params) {
        const firstName = params.data.firstName;
        const lastName = params.data.lastName;
        const combinedData = firstName + " " + lastName;
        return combinedData;
      },
      filter: true,
      sortable: true,
    },
    { name: "Start Date", field: "startDate" },
    { name: "End Date", field: "endDate" },
    { name: "Days", field: "days" },
    { name: "Reason", field: "leaveReason" },

    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <button
          className="approve-btn d-flex  justify-content-center align-items-center"
          onClick={() => onClickApprove(params)}
        >
          Approve
        </button>
      ),
    },

    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <button
          className="reject-btn d-flex  justify-content-center align-items-center"
          onClick={() => onClickReject(params)}
        >
          Reject
        </button>
      ),
    },
  ];

  const paginationPageSize = 10;

  const columnsLeaveHistory = [
    { name: "Emp Id", field: "employeeId" },
    {
      headerName: "NAME",
      valueGetter: function (params) {
        const firstName = params.data.firstName;
        const lastName = params.data.lastName;
        const combinedData = firstName + " " + lastName;
        return combinedData;
      },
      filter: true,
      sortable: true,
    },
    { name: "Start Date", field: "startDate" },
    { name: "End Date", field: "endDate" },
    { name: "Days", field: "days" },
    { name: "Reason", field: "leaveReason" },
    { name: "Rejected Reason", field: "rejectedReason" },
  ];

  return (
    <>
      <Header />
      <div className="d-flex">
        <LeftNavBar />
        <div className="leaves-req-hist-container">
          <div
            className="ag-theme-alpine ag-grid-table"
            style={{
              height: "50vh",
              width: "85vw",
              fontSize: "16px",
              marginLeft: "15px",
            }}
          >
            <h4 className="mb-3">Leave Requests</h4>
            <AgGridReact
              rowData={leavesReqData}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={paginationPageSize}
            ></AgGridReact>
          </div>

          <div
            className="ag-theme-alpine ag-grid-table"
            style={{
              height: "50vh",
              width: "85vw",
              fontSize: "16px",
              marginLeft: "15px",
            }}
          >
            <h4 className="mb-3">Leaves History</h4>
            <AgGridReact
              rowData={leavesHistoryData}
              columnDefs={columnsLeaveHistory}
              pagination={true}
              paginationPageSize={paginationPageSize}
            ></AgGridReact>
          </div>

          <div id="addEmployeeForm">
            {rejectClicked && (
              <div className="popup-overlay-reason">
                <div className="popup-content-reason">
                  {onClickRejectPopup()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequestsRoute;
