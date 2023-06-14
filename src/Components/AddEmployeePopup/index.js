import { useState } from "react";
import { BsX } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";

import "./index.css";

const AddEmployeePopup = (props) => {
  const {
    popupOpen,
    toggleIsPopupOpen,
    UpdateEmpAdded,
    hideNotification,
    fetchEmployees,
  } = props;
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
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
    role: "Admin",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(
    popupOpen === true ? true : false
  );
  const [inValidDataErrorMsg, setInvalidError] = useState("");

  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

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
      method: "POST",
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

    console.log({
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
    });

    const response = await fetch(`${backendEndpoint}/create_employee`, options);

    if (response.status === 200) {
      setIsPopupOpen(false);
      UpdateEmpAdded();
      toggleIsPopupOpen();

      //   setEmployeeAdded(true);
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

  const closePopup = () => {
    setIsPopupOpen(false);
    toggleIsPopupOpen();
  };

  const addEmployeeFormPopup = () => (
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
          value={employeeData.firstName}
            required
            type="text"
            className="input"
            name="firstName"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Last Name*</p>
          <input
          value={employeeData.lastName}
            required
            type="text"
            className="input"
            name="lastName"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">ID*</p>
          <input
            // readOnly
            value={employeeData.id}
            required
            type="text"
            className="input"
            name="id"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels"> Email*</p>
          <input
          value={employeeData.email}
            required
            type="text"
            className="input"
            name="email"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels"> Role*</p>
          <select
            name="role"
            onChange={onChangeInputs}
            className="select-element"
            value={employeeData.role}
          >
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="input-element-container justify-content-space-between">
          <div className="d-flex align-items-center justify-content-between">
            <p className="labels">Password*</p>
            <CopyToClipboard text={employeeData.password}>
              <span>
                <HiOutlineClipboardCopy className="copy-icon" />
              </span>
            </CopyToClipboard>
          </div>

          <input
            required
            type="text"
            className="input"
            value={employeeData.password}
            name="password"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Date of Birth*</p>
          <input
            required
            type="date"
            value={employeeData.dob}
            className="dateElement"
            name="dob"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Joining Date*</p>
          <input
            required
            value={employeeData.joiningDate}
            type="date"
            className="dateElement"
            name="joiningDate"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Qualifications*</p>
          <input
            required
            value={employeeData.qualifications}
            type="text"
            className="input"
            name="qualifications"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Department*</p>
          <input
            required
            value={employeeData.department}
            type="text"
            className="input"
            name="department"
            onChange={onChangeInputs}
          />
        </div>

        <div className="input-element-container">
          <p className="labels">Gender*</p>
          {/* <input type="input" className="input" name='gender' onChange={onChangeInputs} /> */}

          <select
            className="select-element"
            name="gender"
            onChange={onChangeInputs}
            value={employeeData.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="input-element-container">
          <p className="labels">Mobile No*</p>
          <input
            required
            value={employeeData.mobileNo}
            type="tel"
            className="input"
            name="mobileNo"
            onChange={onChangeInputs}
            maxLength="10"
            pattern="[0-9]{10}"
          />
        </div>

        <div className="input-element-container">
          <p className="labels" htmlFor="address">
            Blood Group*
          </p>

          <select
            className="select-element"
            name="bloodGroup"
            onChange={onChangeInputs}
            value={employeeData.bloodGroup}
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
            value={employeeData.designation}
            type="text"
            className="input"
            name="designation"
            onChange={onChangeInputs}
          />
        </div>

        <div>
          <p className="labels">Location*</p>
          <input
            required
            type="text"
            className="input"
            name="address"
            onChange={onChangeInputs}
            value={employeeData.address}
          />
        </div>
      </div>

      {inValidDataErrorMsg.length > 0 && (
        <p className="add-emp-invalid">*{inValidDataErrorMsg}</p>
      )}

      <button type="submit" className="mt-3 submit-btn">
        Submit
      </button>
    </form>
  );

  return (
    <div id="addEmployeeForm">
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">{addEmployeeFormPopup()}</div>
        </div>
      )}
    </div>
  );
};

export default AddEmployeePopup;
