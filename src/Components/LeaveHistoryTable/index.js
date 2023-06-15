// import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise";

import "./index.css";

const LeaveHistoryTable = ({leaveCancelled}) => {
  const [rowData, setRowData] = useState([]);
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

  const handleButtonClick = async (params) => {
    // Handle button click for the row
    const loginDetails=JSON.parse(localStorage.getItem("loginDetails"))
    const jwtToken=loginDetails.details.jwtToken
    console.log(params);
    try{
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application-json",
          Authorization: `bearer ${jwtToken}`,
        },
      };
    const response=await fetch(`${backendEndpoint}/delete_leave/${params}`,options)
    if(response.status===200){
      console.log(leaveCancelled)
      console.log("Leave Delete Applied Succesfully")
      leaveCancelled();
      
    }
    }
    catch(err){
      console.log(err)
    }

  };


  useEffect(() => {
    fetchLeaveHistory(); // eslint-disable-next-line
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      const loginDetails=JSON.parse(localStorage.getItem("loginDetails"))
      const id=loginDetails.details.response.id;
      const jwtToken=loginDetails.details.jwt_token
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application-json",
          Authorization: `bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        `${backendEndpoint}/leaves/${id}`
      ,options);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        const camelCaseData = await data.map((leave) => {
          return {
            empId: leave.employee_id,
            startDate: leave.start_date,
            endDate: leave.end_date,
            status: leave.status,
            rejectionReason: leave.rejected_reason,
            leaveId: leave.leave_id,
            leaveDays: leave.days,
          };
        });
        setRowData(camelCaseData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const columnDefs = [
    // { headerName: "EMP ID", field: "empId" },
    { headerName: "LEAVE ID", field: "leaveId" },
    { headerName: "START DATE", field: "startDate" },
    { headerName: "END DATE", field: "endDate" },
    { headerName: "LEAVE DAYS", field: "leaveDays" },
    { headerName: "STATUS", field: "status" },
    { headerName: "REJECTION REASON", field: "rejectionReason" },
    {
      headerName: "CANCEL LEAVE",
      cellRenderer: (params) => {
        const status = params.data.status;

        if (status === "Pending") {
          return (
            <button
              className="approve-rej-btn d-flex  justify-content-center align-items-center"
              onClick={() => handleButtonClick(params.data.leaveId)}
            >
              Cancel Leave
            </button>
          );
        }
        return "N/A";
      },
    },
  ];

  return (
    <div className="ag-theme-alpine history-container">
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};

export default LeaveHistoryTable;
