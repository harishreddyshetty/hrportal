import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const LeaveForm = ({leaveApplied}) => {
  const [hr, setHr] = useState("");
  const [reason, setReason] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [leaveDays, setLeaveDays] = useState(0);
  const [isLeaveApplied, setIsLeaveApplied] = useState(false);
  const email=localStorage.getItem("email")
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formattedStartDate = dateRange[0]?.toLocaleDateString("en-GB");
    const formattedEndDate = dateRange[1]?.toLocaleDateString("en-GB");

    console.log("HR:", hr);
    console.log("employeeEmail:",email)
    console.log("Reason:", reason);
    console.log("Start Date:", formattedStartDate);
    console.log("End Date:", formattedEndDate);
    console.log("Leave Days:", leaveDays);
  
    const leaveAppliedForm=()=>{
      leaveApplied()
    }
    // Reset form
    setHr("");
    setReason("");
    setDateRange([null, null]);
    setLeaveDays(0);
    setIsLeaveApplied(true);
    setTimeout(leaveAppliedForm,1000)
    
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
          dateFormat="dd/MM/yyyy"
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
            santhosh@openskale.com
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
