import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise";

import "./index.css"

const EmployeeGrid = () => {
  const [rowData, setRowData] = useState([]);

  const handleButtonClick = (params) => {
    // Handle button click for the row
    console.log(params);
  };

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name", filter: true, sortable: true },
    { headerName: "Position", field: "position" ,},
    { headerName: "Salary", field: "salary" },
    {
        headerName: 'Actions',
        cellRenderer: (params) => (
          <button className="approve-rej-btn d-flex  justify-content-center align-items-center" onClick={() => handleButtonClick(params)}>Approve</button>
        ),
      },

      {
        headerName : "test",
        cellRenderer: function(params) {
        // Access the cell value using params.value
        const status = params.data.id;
    
        // Conditionally display specific data based on the status value
        if (status === 1) {
          return <button type="button">Approve</button>;
        } else if (status === 2) {
          return "-";
        } else {
          return status; // Display the original status if no condition is met
        }
      }}
  ];

  const onGridReady = (params) => {
    // Store grid API instance
    // const gridApi = params.api;

    // Retrieve employee data from an API or any data source
    const employees = [
      { id: 1, name: "John Doe", position: "Manager", salary: 50000 },
      { id: 2, name: "Jane Smith", position: "Developer", salary: 40000 },
      { id: 3, name: "Mike Johnson", position: "Designer", salary: 35000 },
      { id: 1, name: "John Doe", position: "Manager", salary: 50000 },
      { id: 2, name: "Jane Smith", position: "Developer", salary: 40000 },
      { id: 3, name: "Mike Johnson", position: "Designer", salary: 35000 },
      { id: 1, name: "John Doe", position: "Manager", salary: 50000 },
      { id: 2, name: "Jane Smith", position: "Developer", salary: 40000 },
      { id: 3, name: "Mike Johnson", position: "Designer", salary: 35000 },
      { id: 1, name: "John Doe", position: "Manager", salary: 50000 },
      { id: 2, name: "Jane Smith", position: "Developer", salary: 40000 },
      { id: 3, name: "Mike Johnson", position: "Designer", salary: 35000 },
      { id: 1, name: "John Doe", position: "Manager", salary: 50000 },
      { id: 2, name: "Jane Smith", position: "Developer", salary: 40000 },
      { id: 3, name: "Mike Johnson", position: "Designer", salary: 35000 },
      // Add more employees as needed
    ];

    // Set employee data to the grid
    setRowData(employees);

    // Auto-size columns to fit the grid width
    // gridApi.sizeColumnsToFit();
  };

  const paginationPageSize = 10;

  return (
    <div className="ag-theme-alpine" style={{ height: "70vh", width: "100%",fontSize:"16px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        pagination={true}
        paginationPageSize={paginationPageSize}
        
      ></AgGridReact>
    </div>
  );
};

export default EmployeeGrid;
