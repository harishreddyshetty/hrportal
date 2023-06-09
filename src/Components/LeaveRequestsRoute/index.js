import { Component } from "react";
// import DataTable from "react-data-table-component";
import Header from "../Header";
import { BsX } from "react-icons/bs";
import "./index.css";
// import HrContext from "../../HrContext/HrContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const leavesReq = [
  {
    id: "OS001",
    Firstname: "Harish",
    LastName: "Reddyshetty",
    startDate: "10/5/2023",
    endDate: "15/5/2023",
    Days: "5",
    reason: "Medical",
    status: "Pending",
  },
  {
    id: "OS002",
    Firstname: "Harish",
    LastName: "Reddyshetty",
    startDate: "10/5/2023",
    endDate: "15/5/2023",
    Days: "5",
    reason: "Personal Work",
    status: "Pending",
  },
  {
    id: "OS003",
    Firstname: "Harish",
    LastName: "Reddyshetty",
    startDate: "10/5/2023",
    endDate: "15/5/2023",
    Days: "5",
    reason: "Casual",
    status: "Pending",
  },
];

class LeaveRequestsRoute extends Component {
  state = {
    leavesReqData: leavesReq,
    apiStatus: apiStatusConstants.initial,
    rejectClicked: false,
    rejectedReason: " ",
    rowData: {},
  };

  // componentDidMount() {
  //   this.getLeavesReqData();
  // }

  // getLeavesReqData = async () => {
  //   this.setState({ apiStatus: apiStatusConstants.inProgress });
  //   const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
  //   const jwtToken = loginDetails.details.jwt_token;

  //   const url = "";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   };

  //   const response = await fetch(url, options);

  //   if (response.ok) {
  //     const data = await response.json();
  //     // const updatedData = write map function

  //     this.setState({
  //       leavesReqData: data,
  //       apiStatus: apiStatusConstants.success,
  //     });
  //   } else {
  //     this.setState({ apiStatus: apiStatusConstants.failure });
  //   }
  // };

  onClickApprove = (params) => {
    const rowData = params.data;
    console.log({...rowData,status:"Approved"});
  };

  onClickReject = (params) => {
    const rowData = params.data;
    console.log({...rowData,status:"Rejected"});
    this.setState({rejectClicked:true})
  };

  onClickSubmitReson = (event) => {
    const { rejectedReason } = this.state;
    event.preventDefault();
    this.setState((prevState) => ({
      rejectClicked: false,
      rowData: { ...prevState.rowData, rejectedReason },
    }));
  };

  onClickClose = () => {
    this.setState({ rejectClicked: false });
  };

  onChangeReason = (e) => {
    this.setState({ rejectedReason: e.target.value });
  };

  onClickRejectPopup = () => (
    <form onSubmit={this.onClickSubmitReson}>
      <div className="d-flex justify-content-between">
        <label className="reason-label" htmlFor="reasonInput">
          Reason*
        </label>
        <button onClick={this.onClickClose} className="close-btn">
          <BsX className="close-icon" />
        </button>
      </div>

      <input
        required
        onChange={this.onChangeReason}
        className="reason-input"
        id="reasonInput"
        type="text"
      />
      <button className="submit-reason-btn" type="submit">
        Submit
      </button>
    </form>
  );

  render() {
    const { rejectClicked } = this.state;

    const columns = [
      { name: "Emp Id",field:"id"},
      {
        headerName: "NAME",
        valueGetter: function (params) {
          const firstName = params.data.Firstname;
          const lastName = params.data.LastName;
          const combinedData = firstName + " " + lastName;
          return combinedData;
        },
        filter: true,
        sortable: true,
      },
      { name: "Start Date",field:"startDate"},
      { name: "End Date",field:"endDate" },
      { name: "Days",field:"Days"},
      { name: "Reason",field:"reason"  },


      {
        headerName: 'Actions',
        cellRenderer: (params) => (
          <button className="approve-rej-btn d-flex  justify-content-center align-items-center" onClick={() => this.onClickApprove(params)}>Approve</button>
        ),
      },

      {
        headerName: 'Actions',
        cellRenderer: (params) => (
          <button className="approve-rej-btn d-flex  justify-content-center align-items-center" onClick={() => this.onClickReject(params)}>Reject</button>
        ),
      },
      
      
    ];

    
    const paginationPageSize = 10;

    // const columnsLeaveHistory = [
    //   { name: "Emp Id", selector: (row) => row.id, sortable: true },
    //   { name: "NAME", selector: (row) => row.name },
    //   { name: "Start Date", selector: (row) => row.startDate },
    //   { name: "End Date", selector: (row) => row.endDate },
    //   { name: "Days", selector: (row) => row.Days },
    //   { name: "Reason", selector: (row) => row.reason },
    //   { name: "Status", selector: (row) => row.status },
    //   { name: "Rejected Reason", selector: (row) => row.rejectedReason },
    // ];

    return (
      <>
        <Header />
       
        <div
          className="ag-theme-alpine ag-grid-table"
          style={{ height: "70vh", width: "100%", fontSize: "16px" }}
        >
          <AgGridReact
            rowData={leavesReq}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={paginationPageSize}
          ></AgGridReact>
        </div>

        
        <div id="addEmployeeForm">
          {rejectClicked && (
            <div className="popup-overlay-reason">
              <div className="popup-content-reason">
                {this.onClickRejectPopup()}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default LeaveRequestsRoute;
