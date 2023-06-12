// import DataTable from "react-data-table-component";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise";

import "./index.css";

const LeaveHistoryTable = () => {
  const [rowData, setRowData] = useState([]);

  const handleButtonClick = (params) => {
    // Handle button click for the row
    console.log(params);
  };

  const columnDefs = [
    { headerName: "EMP ID", field: "empId",},
    { headerName: "START DATE", field: "startDate",},
    { headerName: "END DATE", field: "endDate" },
    { headerName: "LEAVE DAYS", field: "leaveDays"},
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
              onClick={() => handleButtonClick(params)}
            >
              Cancel Leave
            </button>
          );
        }
        return "N/A"
      },
    },
  ];

  const onGridReady = (params) => {
    // Store grid API instance
    //const gridApi = params.api;

    // Retrieve employee data from an API or any data source
    const employees = [
      {
        empId:"OS003",
        startDate: "01-01-2023",
        endDate: "08-05-2001",
        leaveDays: "12",
        status: "Rejected",
        rejectionReason: "You already took for leave this month",
      },
      {
        empId:"OS003",
        startDate: "01-01-2023",
        endDate: "08-05-2001",
        leaveDays: "12",
        status: "Accepted",
        rejectionReason: "-",
      },
      {
        empId:"OS003",
        startDate: "01-01-2023",
        endDate: "08-05-2001",
        leaveDays: "12",
        status: "Rejected",
        rejectionReason: "You already took for leave this month",
      },
      {
        empId:"OS003",
        startDate: "01-01-2023",
        endDate: "08-05-2001",
        leaveDays: "1",
        status: "Rejected",
        rejectionReason: "You already took for leave this month",
      },
      {
        empId:"OS003",
        startDate: "01-01-2023",
        endDate: "08-05-2001",
        leaveDays: "1",
        status: "Accepted",
        rejectionReason: "-",
      },
      {
        empId:"OS003",
        startDate: "01-01-2023",
        endDate: "08-05-2001",
        leaveDays: "1",
        status: "Pending",
        rejectionReason: "-",
      },

      // Add more employees as needed
    ];

    // Set employee data to the grid
    setRowData(employees);

    // Auto-size columns to fit the grid width
   // gridApi.sizeColumnsToFit();
  };

 
  

  return (
  
    <div
      className="ag-theme-alpine history-container" 
     
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        
        
      ></AgGridReact>
    </div>

  );
};

export default LeaveHistoryTable;
