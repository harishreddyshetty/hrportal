import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { BsX, BsFillPersonPlusFill, BsFillPersonFill } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import FailureView from "../FailureView";
//  import AddEmployeePopup from "../AddEmployeePopup"

// import Navbar from '../Navbar';

import IndividualEmployee from "../IndividualEmployee";
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
  // const [isLoading, setIsLoading] = useState(true);

  const [employeeData, setEmployeeData] = useState({
    firstName: "Harish",
    lastName: "Reddyshetty",
    id: "",
    mobileNo: "",
    email: "",
    dob: "",
    joiningDate: "",
    gender: "Male",
    qualifications: "",
    designation: "",
    department: "",
    bloodGroup: "A+",
    address: "",
    password: "",
    role: "",
  });

  // const [inValidDataErrorMsg, setInvalidError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    console.log("fetch called");
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log("btn clicked");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  async function fetchEmployees() {
    try {
      console.log("entered fetchemployees");
      setApiStatus(apiStatusConstants.inProgress);
      const response = await fetch("http://192.168.0.158:8000/employees");
      const data = await response.json();

      console.log(response);

      const CamelCaseData = await data.map((employee) => ({
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
        address: employee.address,
        designation: employee.designation,
        joiningDate: employee.joining_date,
        role: employee.role,
      }));

      setEmployees(CamelCaseData);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.log("Error fetching employees:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  }

  const handleAddEmployeeForm = async (e) => {
    const {
      firstName,
      lastName,
      id,
      mobileNo,
      email,
      dob,
      joiningDate,
      qualifications,
      designation,
      department,
      address,
      bloodGroup,
      gender,
      role,
      password,
    } = employeeData;

    e.preventDefault();

    const options = {
      method: "post",
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
        gender: gender,
        department: department,
        address: address,
        blood_group: bloodGroup,
        password: password,
        role: role,
      }),
    };

    console.log({
      first_name: firstName,
      last_name: lastName,
      id: id,
      mobile_number: mobileNo,
      email: email,
      date_of_birth: dob,
      gender,
      joining_date: joiningDate,
      qualifications: qualifications,
      designation: designation,
      department: department,
      address: address,
      blood_group: bloodGroup,
      role: role,
      password: password,
    });

    const areDetailsUnique = employees.filter(
      (eachEmployee) =>
        eachEmployee.email === email ||
        eachEmployee.id === id ||
        eachEmployee.mobileNo === mobileNo
    );

    console.log(areDetailsUnique, "is email unique");

    // if (areDetailsUnique.length !== 0) {
    //   setInvalidError("Please enter valid details");
    // }

    const response = await fetch(
      "http://192.168.0.158:8000/create_employee",
      options
    );
    console.log(response, "response from server");

    if (response.status === 200) {
      fetchEmployees();
      setIsPopupOpen(false);
    }
  };

  const OnchnageHandler = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  // const onClickProfile = () => {
  //   setIsProfileCLickPopup((prevState) => !prevState);
  //   console.log("profile Clicked");
  // };

  const onClickLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  const popupForm = () => (
    <form className="form-group" onSubmit={handleAddEmployeeForm}>
      <div className="d-flex justify-content-end m-0">
        <button className="close-button" onClick={closePopup}>
          <BsX className="close-icon" />
        </button>
      </div>

      <h3 className="mb-3">Add Employee</h3>
      <div className="add-employee-form-container">
        <div className="input-element-container">
          <p className="labels">First Name*</p>
          <input
            required
            type="text"
            className="input"
            name="firstName"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Last Name*</p>
          <input
            required
            type="text"
            className="input"
            name="lastName"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">ID*</p>
          <input
            // readOnly
            required
            type="text"
            className="input"
            name="id"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels"> Email*</p>
          <input
            required
            type="text"
            className="input"
            name="email"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels"> Role*</p>
          <select
            name="role"
            onChange={OnchnageHandler}
            className="select-element"
          >
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="input-element-container justify-content-space-between">
          <div className="d-flex align-items-center justify-content-between">
            <p className="labels">Password*</p>
            <CopyToClipboard
              text={employeeData.password}
            >
              <span>
                <HiOutlineClipboardCopy className="copy-icon"/>
              </span>
            </CopyToClipboard>
          </div>

         
          <input
            required
            type="text"
            className="input"
            name="password"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Date of Birth*</p>
          <input
            required
            type="date"
            className="dateElement"
            name="dob"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Joining Date*</p>
          <input
            required
            type="date"
            className="dateElement"
            name="joiningDate"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Qualifications*</p>
          <input
            required
            type="text"
            className="input"
            name="qualifications"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Department*</p>
          <input
            required
            type="text"
            className="input"
            name="department"
            onChange={OnchnageHandler}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Gender*</p>
          {/* <input type="input" className="input" name='gender' onChange={OnchnageHandler} /> */}

          <select
            className="select-element"
            name="gender"
            onChange={OnchnageHandler}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="input-element-container">
          <p className="labels">Mobile No*</p>
          <input
            required
            type="tel"
            className="input"
            name="mobileNo"
            onChange={OnchnageHandler}
            maxLength="10"
            pattern="[0-9]{10}"
          />
        </div>

        <div className="input-element-container">
          <p className="labels" htmlFor="address">
            Blood Group*
          </p>
          {/* <input type="text" className="input" name='bloodGroup' onChange={OnchnageHandler} /> */}

          <select
            className="select-element"
            name="bloodGroup"
            onChange={OnchnageHandler}
          >
            <option className="option-bg" value="A+">
              A+
            </option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="input-element-container">
          <p className="labels" htmlFor="designation">
            Designation*
          </p>
          <input
            required
            type="text"
            className="input"
            name="designation"
            onChange={OnchnageHandler}
          />
        </div>

        <div>
          <p className="labels">Location*</p>
          <input
            required
            type="text"
            className="input"
            name="address"
            onChange={OnchnageHandler}
          />
        </div>
      </div>

      {/* {inValidDataErrorMsg.length > 0 && <p>*{inValidDataErrorMsg}</p>} */}

      <button type="submit" className="mt-3 submit-btn">
        Submit
      </button>
    </form>
  );

  // const profilePopup = () => {
  //   const { firstName, lastName } = employeeData;

  //   return (
  //     <div>
  //       <p>
  //         {firstName} {lastName}!
  //       </p>
  //       <p className="mb-0">Your Profile</p>
  //       <button className="logout-btn mt-0" onClick={onClickLogout}>
  //         Logout
  //       </button>
  //     </div>
  //   );
  // };

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
    <div className="tailspin d-flex flex-column align-items-center justify-content-center">
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

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>Emp Id</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>Role</th>
          <th>DESIGNATION</th>
          <th>DEPARTMENT</th>
          <th>QUALIFICATIONS</th>
          <th>JOININGDATE</th>
          <th>DOB</th>
          <th>GENDER</th>
          <th>BLOOD GROUP</th>
          <th>MOBILE NO</th>
          <th>ADDRESS</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <IndividualEmployee data={employee} key={employee.id} />
        ))}
      </tbody>
    </table>
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
    <div className="d-flex flex-column  mt-0 all-employees-container">
      <nav className="header-container">
        <img
          className="company-logo-header"
          src="https://i.postimg.cc/kX5s4kWg/Openscale-Technologies-D6-CV.png"
          alt="logo"
        />
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

          {/* onClick={onClickProfile} */}

          <button className="profile-icon-container">
            <BsFillPersonFill size="30px" color="white" />
          </button>
        </div>
      </nav>

      {renderAllEmployeesPage()}

      {/* <div>
        {isPopupOpen && (<AddEmployeePopup  closePopup={closePopup()} fetchEmployees={fetchEmployees()}/>)}
      </div> */}

      <div>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">{popupForm()}</div>
          </div>
        )}
      </div>

      {/* <div>
        {profileclicked && (
          <div className="popup-overlay-profile d-flex justify-content-end">
            <div className="popup-content-profile ">{profilePopup()}</div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default AllEmployees;
