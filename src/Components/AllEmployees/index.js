import { useEffect, useMemo, useState } from "react";
import { Vortex } from "react-loader-spinner";
import FailureView from "../FailureView";
import LeftNavBar from "../LeftNavBar";
import Header from "../Header"
import AddEmployeePopup from "../AddEmployeePopup";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "./index.css";


const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const AllEmployees = (props) => {
  const [employees, setEmployees] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
 
  const [employeeAdded, setEmployeeAdded] = useState(false);

  
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

 


  useEffect(() => {
    fetchEmployees();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleIsPopupOpen = () =>{
    setIsPopupOpen(false)
  }

  const UpdateEmpAdded = () => {
    setEmployeeAdded(true)
  }

 

 

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const fetchEmployees = async () => {
    try {

      setApiStatus(apiStatusConstants.inProgress);
      const loginData = JSON.parse(localStorage.getItem("loginDetails"));
      const jwtToken = loginData.details.jwt_token;

      const options = {
        method: "GET",
        headers: {
          Authorization: `bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${backendEndpoint}/employees`, options);
    
      setApiStatus(apiStatusConstants.inProgress);


      const data = await response.json();

      const updatedData = await data.map((employee) => ({
        firstName: employee.first_name,
        lastName: employee.last_name,
        id: employee.id,
        dob: employee.date_of_birth,
        qualifications: employee.qualifications,
        department: employee.department,
        salary: employee.salary,
        username: employee.username,
        bloodGroup: employee.blood_group,
        gender: employee.gender,
        mobileNo: employee.mobile_number,
        email: employee.email,
        location: employee.address,
        designation: employee.designation,
        joiningDate: employee.joining_date,
        role: employee.role,
      }));

      setEmployees(updatedData);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

 
  const hideNotification = () => {
    setTimeout(() => {
      setEmployeeAdded(false);
    }, 2000);
  };




  const noDataDisplay = () => (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img
        className="noData-img"
        alt="NoData"
        src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1685691455~exp=1685692055~hmac=e7fe93b465ad04cefb40b139444400f1cb0f9068a880f91999b843299068fdca"
      />

      <h3>No Records Found</h3>
    </div>
  );

  const renderLoadingView = () => (
    <div className="tailspin d-flex flex-column align-items-center justify-content-center loader-container">
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
  );

  const columnDefs = [
    { headerName: "Emp Id", field: "id", width: 120, filter: true },
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
    { headerName: "EMAIL", field: "email" },
    { headerName: "ROLE", field: "role", width: 130 },
    {
      headerName: "DESIGNATION",
      field: "designation",
      width: 200,
      filter: true,
    },
    { headerName: "DEPARTMENT", field: "department" },
    { headerName: "QUALIFICATIONS", field: "qualifications" },
    { headerName: "JOINING DATE", field: "joiningDate", width: 150 },
    { headerName: "DOB", field: "dob", width: 120 },
    {
      headerName: "GENDER",
      field: "gender",
      width: 150,
      cellStyle: { display: "flex", justifyContent: "center" },
    },
    {
      headerName: "BLOOD GROUP",
      field: "bloodGroup",
      width: 150,
      cellStyle: { display: "flex", justifyContent: "center" },
      filter: true,
    },
    { headerName: "MOBILE NO", field: "mobileNo", width: 130 },
    { headerName: "LOCATION", field: "location", filter: true },
  ];

  const defaultColDef = useMemo(
    () => ({
      cellStyle: { fontSize: "16px" },
    }),
    []
  );

  const paginationPageSize = 10;

  const onClickAddEmployee = () => {
    setIsPopupOpen(true)
  }

  const renderTable = () => (
    <div
      className="ag-theme-alpine"
      style={{
        height: "70vh",
        width: "85vw",
        fontSize: "16px",
        marginLeft: "20px",
      }}
    >
      <h3 className="text-center mb-3 ">All Employees</h3>
      <button type="button" className="add-employee-btn" onClick={onClickAddEmployee}>Add Employee</button>
      <AgGridReact
        title="All Employees"
        columnDefs={columnDefs}
        rowData={employees}
        pagination={true}
        paginationPageSize={paginationPageSize}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );

  const renderEmployeeTable = () => (
    <div className="mt-5 table-container">
      {employees.length > 0 ? renderTable() : noDataDisplay()}
    </div>
  );

  const onClickRetry = () => fetchEmployees();

  const renderAllEmployeesPage = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderEmployeeTable();
      case apiStatusConstants.failure:
        return <FailureView onClickRetry={onClickRetry} />;
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
    <Header/>
     <div className="d-flex flex-column  mt-0 all-employees-container">
      <div className="d-flex ">
        <LeftNavBar />
        <div>{renderAllEmployeesPage()}</div>
      </div>

    

      {isPopupOpen && <AddEmployeePopup popupClose={closePopup} fetchEmployees={fetchEmployees} popupOpen={isPopupOpen} hideNotification={hideNotification} toggleIsPopupOpen = {toggleIsPopupOpen} UpdateEmpAdded={UpdateEmpAdded}/>}

     

      <div id="successfulNotificationPopup">
        {employeeAdded && (
          <div className="d-flex justify-content-center align-items-center popup-overlay-alert">
            <div className="notification-alert d-flex justify-content-center align-items-center">
              <p className="text-success">Employee Added Successfully!</p>
            </div>
          </div>
        )}
      </div>
    </div>
    
    </>
   
  );
};

export default AllEmployees;
