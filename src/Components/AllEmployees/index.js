import { useEffect, useMemo, useState } from "react";
<<<<<<< HEAD
// import { useNavigate } from "react-router-dom";
// import DataTable from "react-data-table-component";
import { Vortex } from "react-loader-spinner";
// import { BsFillPersonPlusFill, BsFillPersonFill } from "react-icons/bs";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { HiOutlineClipboardCopy } from "react-icons/hi";
=======
import { useNavigate, Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
import { Vortex } from "react-loader-spinner";
import { BsX, BsFillPersonPlusFill, BsFillPersonFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";
>>>>>>> 4828435 (added widget cards and  sliding modal)
// import { RiLogoutCircleRLine } from "react-icons/ri";
import FailureView from "../FailureView";

<<<<<<< HEAD
import LeftNavBar from "../LeftNavBar";
import Header from "../Header"

import AddEmployeePopup from "../AddEmployeePopup";

=======
>>>>>>> 4828435 (added widget cards and  sliding modal)
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
  // const [profileclicked, setIsProfileCLickPopup] = useState(false);
  const [employeeAdded, setEmployeeAdded] = useState(false);
  // const [inValidDataErrorMsg, setInvalidError] = useState("");
  // const [employeeData, setEmployeeData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   id: "",
  //   mobileNo: "",
  //   email: "",
  //   dob: "",
  //   joiningDate: "",
  //   gender: "Male",
  //   qualifications: "",
  //   designation: "",
  //   department: "",
  //   bloodGroup: "A+",
  //   address: "",
  //   password: "",
  //   role: "Admin",
  // });

  // const [clickAddEmploee,setAddEmploee] = useState(false)

  // const [searchValue, setSearchValue] = useState("")
  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

<<<<<<< HEAD
=======
  // const [searchValue, setSearchValue] = useState("")
>>>>>>> 4828435 (added widget cards and  sliding modal)


  useEffect(() => {
    fetchEmployees();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

<<<<<<< HEAD
  const toggleIsPopupOpen = () =>{
    setIsPopupOpen(false)
  }

  const UpdateEmpAdded = () => {
    setEmployeeAdded(true)
  }

 

  // const openPopup = () => {
  //   setIsPopupOpen(true);
  //   setIsProfileCLickPopup(false);
  // };
=======
  const openPopup = () => {
    setIsPopupOpen(true);
    setIsProfileCLickPopup(false);
  };
>>>>>>> 4828435 (added widget cards and  sliding modal)

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const fetchEmployees = async () => {
    try {
<<<<<<< HEAD
      setApiStatus(apiStatusConstants.inProgress);
<<<<<<< HEAD
      const loginData = JSON.parse(localStorage.getItem("loginDetails"));
      const jwtToken = loginData.details.jwt_token;

      const options = {
        method: "GET",
        headers: {
          Authorization: `bearer ${jwtToken}`,
        },
      };
      const response = await fetch(`${backendEndpoint}/employees`, options);
=======
      const response = await fetch(`${backendEndpoint}/employees`);
>>>>>>> 4585445 (Created LeaveForm component)
=======
      // headers: {
      //   authorization: `bearer ${jwtToken}`,
      // },
      setApiStatus(apiStatusConstants.inProgress);
      // const loginData = JSON.parse(localStorage.getItem("loginDetails"));
      // const jwtToken = loginData.details.jwt_token;

      // const options = {
      //   method: "GET",
      //   headers: {
      //     authorization: `bearer ${jwtToken}`,
      //   },
      // };
      const response = await fetch("http://192.168.0.158:8000/employees");
>>>>>>> 4828435 (added widget cards and  sliding modal)
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

  // to hide the employee added notification after 3 secs
  const hideNotification = () => {
    setTimeout(() => {
      setEmployeeAdded(false);
    }, 2000);
  };

  // on submit add employee form
  // const handleAddEmployeeForm = async (e) => {
  //   const {
  //     firstName,
  //     lastName,
  //     id,
  //     mobileNo,
  //     email,
  //     dob,
  //     joiningDate,
  //     qualifications,
  //     designation,
  //     department,
  //     address,
  //     bloodGroup,
  //     gender,
  //     role,
  //     password,
  //   } = employeeData;

  //   e.preventDefault();

<<<<<<< HEAD
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       first_name: firstName,
  //       last_name: lastName,
  //       id: id,
  //       mobile_number: mobileNo,
  //       email: email,
  //       date_of_birth: dob,
  //       joining_date: joiningDate,
  //       qualifications: qualifications,
  //       designation: designation,
  //       department: department,
  //       address: address,
  //       blood_group: bloodGroup,
  //       gender: gender,
  //       password: password,
  //       role: role,
  //     }),
  //   };

<<<<<<< HEAD
  //   console.log({
  //     first_name: firstName,
  //     last_name: lastName,
  //     id: id,
  //     mobile_number: mobileNo,
  //     email: email,
  //     date_of_birth: dob,
  //     joining_date: joiningDate,
  //     qualifications: qualifications,
  //     designation: designation,
  //     department: department,
  //     address: address,
  //     blood_group: bloodGroup,
  //     gender: gender,
  //     password: password,
  //     role: role,
  //   });
=======
    const response = await fetch(`${backendEndpoint}/create_employee`,
=======
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        id: id,
        mobile_number: mobileNo,
        email: email,
        date_of_birth: dob,
        joining_date: joiningDate,
        qualifications: qualifications,
        designation: designation,
        department: department,
        address: address,
        blood_group: bloodGroup,
        gender: gender,
        password: password,
        role: role,
      }),
    };

    const response = await fetch(
      "http://192.168.0.158:8000/create_employee",
>>>>>>> 4828435 (added widget cards and  sliding modal)
      options
    );
>>>>>>> 4585445 (Created LeaveForm component)

<<<<<<< HEAD
  //   const response = await fetch(`${backendEndpoint}/create_employee`, options);
  //   console.log(response,"response on form submittion")

  //   if (response.status === 200) {
  //     setIsPopupOpen(false);
  //     setEmployeeAdded(true);
  //     hideNotification();
  //     fetchEmployees();
  //   } else {
  //     const data = await response.json();
  //     setInvalidError(data.detail);
  //   }
  // };

  // const onChangeInputs = (e) => {
  //   setEmployeeData({
  //     ...employeeData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onClickProfile = () => {
  //   setIsProfileCLickPopup((prevState) => !prevState);
  //   console.log("profile Clicked");
  // };
=======
    if (response.status === 200) {
      setIsPopupOpen(false);
      setEmployeeAdded(true);
      hideNotification();
      fetchEmployees();
    } else {
      const data = await response.json();
      setInvalidError(data.detail);
    }
  };

  const onChangeInputs = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };
>>>>>>> 4828435 (added widget cards and  sliding modal)

  

  // add employee form
  // const popupForm = () => (
  //   <form className="form-group" onSubmit={handleAddEmployeeForm}>
  //     <div className="d-flex justify-content-end m-0">
  //       <button className="close-button" onClick={closePopup}>
  //         <BsX className="close-icon" />
  //       </button>
  //     </div>

<<<<<<< HEAD
  //     <h3 className="mb-3">Add Employee</h3>
  //     <div className="add-employee-form-container">
  //       <div className="input-element-container">
  //         <p className="labels">First Name*</p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="firstName"
  //           onChange={onChangeInputs}
  //         />
  //       </div>
=======
  // add employee form
  const popupForm = () => (
    <form className="form-group" onSubmit={handleAddEmployeeForm}>
      <div className="d-flex justify-content-end m-0">
        <button className="close-button" onClick={closePopup}>
          <BsX className="close-icon" />
        </button>
      </div>
>>>>>>> 4828435 (added widget cards and  sliding modal)

  //       <div className="input-element-container">
  //         <p className="labels">Last Name*</p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="lastName"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">ID*</p>
  //         <input
  //           // readOnly
  //           required
  //           type="text"
  //           className="input"
  //           name="id"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels"> Email*</p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="email"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels"> Role*</p>
  //         <select
  //           name="role"
  //           onChange={onChangeInputs}
  //           className="select-element"
  //         >
  //           <option value="Admin">Admin</option>
  //           <option value="Employee">Employee</option>
  //         </select>
  //       </div>

  //       <div className="input-element-container justify-content-space-between">
  //         <div className="d-flex align-items-center justify-content-between">
  //           <p className="labels">Password*</p>
  //           <CopyToClipboard text={employeeData.password}>
  //             <span>
  //               <HiOutlineClipboardCopy className="copy-icon" />
  //             </span>
  //           </CopyToClipboard>
  //         </div>

  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="password"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">Date of Birth*</p>
  //         <input
  //           required
  //           type="date"
  //           className="dateElement"
  //           name="dob"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">Joining Date*</p>
  //         <input
  //           required
  //           type="date"
  //           className="dateElement"
  //           name="joiningDate"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">Qualifications*</p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="qualifications"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">Department*</p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="department"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">Gender*</p>
  //         {/* <input type="input" className="input" name='gender' onChange={onChangeInputs} /> */}

  //         <select
  //           className="select-element"
  //           name="gender"
  //           onChange={onChangeInputs}
  //         >
  //           <option value="Male">Male</option>
  //           <option value="Female">Female</option>
  //         </select>
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels">Mobile No*</p>
  //         <input
  //           required
  //           type="tel"
  //           className="input"
  //           name="mobileNo"
  //           onChange={onChangeInputs}
  //           maxLength="10"
  //           pattern="[0-9]{10}"
  //         />
  //       </div>

  //       <div className="input-element-container">
  //         <p className="labels" htmlFor="address">
  //           Blood Group*
  //         </p>

<<<<<<< HEAD
  //         <select
  //           className="select-element"
  //           name="bloodGroup"
  //           onChange={onChangeInputs}
  //         >
  //           <option className="option-bg" value="A+">
  //             A+
  //           </option>
  //           <option value="B+">B+</option>
  //           <option value="AB+">AB+</option>
  //           <option value="O+">O+</option>
  //           <option value="A-">A-</option>
  //           <option value="B-">B-</option>
  //           <option value="AB-">AB-</option>
  //           <option value="O-">O-</option>
  //         </select>
  //       </div>
=======
        <div className="input-element-container">
          <p className="labels" htmlFor="address">
            Blood Group*
          </p>
>>>>>>> 4828435 (added widget cards and  sliding modal)

  //       <div className="input-element-container">
  //         <p className="labels" htmlFor="designation">
  //           Designation*
  //         </p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="designation"
  //           onChange={onChangeInputs}
  //         />
  //       </div>

  //       <div>
  //         <p className="labels">Location*</p>
  //         <input
  //           required
  //           type="text"
  //           className="input"
  //           name="address"
  //           onChange={onChangeInputs}
  //         />
  //       </div>
  //     </div>

  //     {inValidDataErrorMsg.length > 0 && (
  //       <p className="add-emp-invalid">*{inValidDataErrorMsg}</p>
  //     )}

  //     <button type="submit" className="mt-3 submit-btn">
  //       Submit
  //     </button>
  //   </form>
  // );

<<<<<<< HEAD
  // popup on clicking profile icon
  // const profilePopup = () => {
  //   return (
  //     <div>
  //       <Link to="/employee">
  //         <p className="mb-0">Your Profile</p>
  //       </Link>

  //       <button className="logout-btn mt-0" onClick={onClickLogout}>
  //         Logout
  //       </button>
  //     </div>
  //   );
  // };

=======
      <button type="submit" className="mt-3 submit-btn">
        Submit
      </button>
    </form>
  );

  // popup on clicking profile icon
  const profilePopup = () => {
    return (
      <div>
        <Link to="/employee">
          <p className="mb-0">Your Profile</p>
        </Link>

        <button className="logout-btn mt-0" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    );
  };

>>>>>>> 4828435 (added widget cards and  sliding modal)
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
<<<<<<< HEAD
    { headerName: "Emp Id", field: "id", width: 120, filter: true },
=======
    { headerName: "Emp Id", field: "id", width: "110px", filter: true },
>>>>>>> 4828435 (added widget cards and  sliding modal)
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
<<<<<<< HEAD
    { headerName: "ROLE", field: "role", width: 130 },
    {
      headerName: "DESIGNATION",
      field: "designation",
      width: 200,
=======
    { headerName: "ROLE", field: "role", width: "130px" },
    {
      headerName: "DESIGNATION",
      field: "designation",
      width: "200px",
>>>>>>> 4828435 (added widget cards and  sliding modal)
      filter: true,
    },
    { headerName: "DEPARTMENT", field: "department" },
    { headerName: "QUALIFICATIONS", field: "qualifications" },
<<<<<<< HEAD
    { headerName: "JOINING DATE", field: "joiningDate", width: 150 },
    { headerName: "DOB", field: "dob", width: 120 },
    {
      headerName: "GENDER",
      field: "gender",
      width: 150,
      cellStyle: { display: "flex", justifyContent: "center" },
=======
    { headerName: "JOINING DATE", field: "joiningDate", width: "150px" },
    { headerName: "DOB", field: "dob", width: "120px" },
    {
      headerName: "GENDER",
      field: "gender",
      width: "150px",
      cellStyle: { display: "flex", "justify-content": "center" },
>>>>>>> 4828435 (added widget cards and  sliding modal)
    },
    {
      headerName: "BLOOD GROUP",
      field: "bloodGroup",
<<<<<<< HEAD
      width: 150,
      cellStyle: { display: "flex", justifyContent: "center" },
      filter: true,
    },
    { headerName: "MOBILE NO", field: "mobileNo", width: 130 },
=======
      width: "150px",
      cellStyle: { display: "flex", "justify-content": "center" },
      filter: true,
    },
    { headerName: "MOBILE NO", field: "mobileNo", width: "130px" },
>>>>>>> 4828435 (added widget cards and  sliding modal)
    { headerName: "LOCATION", field: "location", filter: true },
  ];

  const defaultColDef = useMemo(
    () => ({
<<<<<<< HEAD
      cellStyle: { fontSize: "16px" },
=======
      cellStyle: { "font-size": "16px" },
>>>>>>> 4828435 (added widget cards and  sliding modal)
    }),
    []
  );

  const paginationPageSize = 10;

<<<<<<< HEAD
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
=======
  const renderTable = () => (
    <div
      className="ag-theme-alpine"
      style={{ height: "70vh", width: "100%", fontSize: "16px" }}
    >
>>>>>>> 4828435 (added widget cards and  sliding modal)
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
<<<<<<< HEAD
    <>
    <Header/>
     <div className="d-flex flex-column  mt-0 all-employees-container">
      <div className="d-flex ">
        <LeftNavBar />
        <div>{renderAllEmployeesPage()}</div>
      </div>

      {/* <div id="addEmployeeForm">
=======
    <div className="d-flex flex-column  mt-0 all-employees-container">
      <nav className="header-container">
        <Link to="/">
          <img
            className="company-logo-header"
            src="https://i.postimg.cc/kX5s4kWg/Openscale-Technologies-D6-CV.png"
            alt="logo"
          />
        </Link>

        <div className="header-elements-right">
          <button className="add-employee-btn" onClick={openPopup}>
            Add Employee
          </button>

          <button
            onClick={openPopup}
            className="add-employee-icon-btn d-flex justify-content-center align-items-center d-md-none"
          >
            <BsFillPersonPlusFill className="add-employee-icon" />
          </button>

          <button
            onClick={onClickLogout}
            className="logout-icon-btn d-flex justify-content-center align-items-center d-md-none"
          >
            <RiLogoutCircleRLine className="add-employee-icon" />
          </button>

          <button onClick={onClickProfile} className="profile-icon-container">
            <BsFillPersonFill size="30px" color="white" />
          </button>
        </div>
      </nav>

      {renderAllEmployeesPage()}

      <div id="addEmployeeForm">
>>>>>>> 4828435 (added widget cards and  sliding modal)
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">{popupForm()}</div>
          </div>
        )}
      </div> */}

      {isPopupOpen && <AddEmployeePopup popupClose={closePopup} fetchEmployees={fetchEmployees} popupOpen={isPopupOpen} hideNotification={hideNotification} toggleIsPopupOpen = {toggleIsPopupOpen} UpdateEmpAdded={UpdateEmpAdded}/>}

      {/* <div id="optionsPopup">
        {profileclicked && (
          <div className="popup-overlay-profile d-flex justify-content-end">
            <div className="popup-content-profile">{profilePopup()}</div>
          </div>
        )}
      </div> */}

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
