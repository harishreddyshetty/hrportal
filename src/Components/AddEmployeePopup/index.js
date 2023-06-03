import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { BsX } from "react-icons/bs";

import "./index.css";

const AddEmployeePopup = (props) => {
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

  //   const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { closePopup, fetchEmployees } = props;

  const onClickclosePopup = () => {
    closePopup();
  };

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

    // console.log({
    //   first_name: firstName,
    //   last_name: lastName,
    //   id: id,
    //   mobile_number: mobileNo,
    //   email: email,
    //   date_of_birth: dob,
    //   gender,
    //   joining_date: joiningDate,
    //   qualifications: qualifications,
    //   designation: designation,
    //   department: department,
    //   address: address,
    //   blood_group: bloodGroup,
    //   role:role,
    //   password:password
    // });

    // const areDetailsUnique = employees.filter(
    //   (eachEmployee) =>
    //     eachEmployee.email === email ||
    //     eachEmployee.id === id ||
    //     eachEmployee.mobileNo === mobileNo
    // );

    // console.log(areDetailsUnique, "is email unique");

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
      //   setIsPopupOpen(false);
      closePopup();
    }
  };

  const OnchnageHandler = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const popupForm = () => (
    <form className="form-group" onSubmit={handleAddEmployeeForm}>
      <div className="d-flex justify-content-end m-0">
        <button className="close-button" onClick={onClickclosePopup}>
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
              className="d-inline ml-5"
              text={employeeData.password}
            >
              <span>
                <HiOutlineClipboardCopy />
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

  return (
    // <div>
    //     {isPopupOpen && (
    //       <div className="popup-overlay">
    //       <div className="popup-content">{popupForm()}</div>
    //     </div>
    //     )}
    //   </div>

    <div className="popup-overlay">
      <div className="popup-content">{popupForm()}</div>
    </div>
  );
};

export default AddEmployeePopup;
