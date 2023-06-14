import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuid } from "uuid";
import { format } from "date-fns";
import "./index.css";

const LeaveForm = ({ leaveApplied }) => {
  const [hr, setHr] = useState("");
  const [reason, setReason] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [leaveDays, setLeaveDays] = useState(0);
  const [success,setSuccess]=useState(false);
  const [err,setErr]=useState(false)

  const backendEndpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleDateChange = (dates) => {
    setDateRange(dates);

    if (dates[0] && dates[1]) {
      const start = new Date(dates[0].setHours(0, 0, 0, 0));
      const end = new Date(dates[1].setHours(0, 0, 0, 0));

      const diffTime = Math.abs(end - start);
      const calculatedLeaveDays = (Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
      setLeaveDays(calculatedLeaveDays);
    } else {
      setLeaveDays(0);
    }
  };

  const leaveAppliedForm = () => {
    leaveApplied();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = format(dateRange[0], "yyyy-MM-dd");
    const formattedEndDate = format(dateRange[1], "yyyy-MM-dd");

    
    const randomId = uuid().substring(2,8);

    

   
    try {
      const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
      const jwtToken = loginDetails.details.jwt_token;
      const id=loginDetails.details.response.id;
      const data = {
        leave_id: randomId,
        hr_email: hr,
        employee_email: loginDetails.email,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        days: leaveDays,
        status: "Pending",
        leave_reason: reason,
        employee_id:id
       
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` bearer ${jwtToken}`,
        },
        body: JSON.stringify(data),
      };
      console.log(options);

      const response = await fetch(`${backendEndpoint}/apply_leave`, options);
      

      console.log(response);
      if (response.status === 200) {
       setSuccess(true)
       setErr(false)
      } else {
        setSuccess(false)
        err(true)
      }
    } catch (err) {
      console.log(err);
      setErr(true)
    }

    // Reset form
    setHr("");
    setReason("");
    setDateRange([null, null]);
    setLeaveDays(0);
 
    setTimeout(leaveAppliedForm, 2000);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group col-lg-9 mb-3">
        <label htmlFor="dateRange">Date Range:</label>
        <DatePicker
          id="dateRange"
          selected={dateRange[0]}
          onChange={handleDateChange}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          required
          minDate={tomorrow}
          dateFormat="dd-MM-yyyy"
          placeholderText="Select Date Range"
          className="form-control"
        />
      </div>
      <div className="form-group col-lg-9 mb-3">
        <label htmlFor="hr">Select Your Lead:</label>
        <select
          id="hr"
          className="form-control"
          required
          value={hr}
          onChange={(e) => setHr(e.target.value)}
        >
          <option value=""> Select Your Lead </option>
          <option value="suresh.salloju@openskale.com">
            suresh.salloju@openskale.com
          </option>
          <option value="vikas.voladri@openskale.com">
            vikas.voladri@openskale.com
          </option>
          <option value="santhosh.bhumireddy@openskale.com">
            sbhumireddy@openskale.com
          </option>
        </select>
    
      </div>
      <div className="form-group col-lg-9 mb-3">
        <label htmlFor="reason">Reason for Leave:</label>
        <input
          type="text"
          id="reason"
          required
          className="form-control"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      {leaveDays > 0 && (
        <p className="leave-days">Number of Leave Days: {leaveDays}</p>
      )}
      {success&&<p className="text-success success-msg">Leave Applied Succesfully</p>}
      {err&&<p className="text-danger">There was an issue while applying Please apply again</p>}
      <div className="form-btn-container">
        <button type="submit" className="submit-leave-btn">
          Apply Leave
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
