import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuid} from "uuid"
import {format} from "date-fns"
import "./index.css";

const LeaveForm = ({leaveApplied}) => {
  const [hr, setHr] = useState("");
  const [reason, setReason] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [leaveDays, setLeaveDays] = useState(0);
  const [isLeaveApplied, setIsLeaveApplied] = useState(false);
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleDateChange = (dates) => {
    setDateRange(dates);

    if (dates[0] && dates[1]) {
      const start = new Date(dates[0].setHours(0, 0, 0, 0));
      const end = new Date(dates[1].setHours(0, 0, 0, 0));

      const diffTime = Math.abs(end - start);
      const calculatedLeaveDays =
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setLeaveDays(calculatedLeaveDays);
    } else {
      setLeaveDays(0);
    }
  };

  const leaveAppliedForm=()=>{
    leaveApplied()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
   
    const formattedStartDate = format(dateRange[0], "dd-MM-yyyy");
    const formattedEndDate = format(dateRange[1], "dd-MM-yyyy");

    console.log(formattedEndDate)
    const loginDetails=JSON.parse(localStorage.getItem("loginDetails"))
    const jwtToken=loginDetails.details.jwt_token
    const data={
      id:uuid(),
      hr_email:hr,
      employee_email:loginDetails.email,
      start_date:formattedStartDate,
      end_date:formattedEndDate,
      leave_days:leaveDays,


    }
    console.log(data)
    const options={
      method:"POST",
      headers:{
        Authorization:`bearer ${jwtToken}`
      },
      body:JSON.stringify(data)
    }

  
   
    // Reset form
    setHr("");
    setReason("");
    setDateRange([null, null]);
    setLeaveDays(0);
    setIsLeaveApplied(true);
    setTimeout(leaveAppliedForm,500)
    
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
          <option value="lead" > Select Your Lead </option>
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
          <p>Number of Leave Days: {leaveDays}</p>
        )}
      <div className="form-btn-container">
        
        {isLeaveApplied ? (
          <p className="text-success success-msg">Leave applied successfully</p>
        ) : (
          <button type="submit" className="submit-leave-btn">
            Apply Leave
          </button>
        )}
      </div>
    </form>
  );
};

export default LeaveForm;
