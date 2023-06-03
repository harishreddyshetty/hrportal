import "./index.css"


const FailureView = (props) => {
  const { onClickRetry } = props;

  const clickRetry = () => {
    onClickRetry();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center failure-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We are having some trouble to complete your request.
        <br /> Please try again.
      </p>

      <button className="retry-btn" onClick={clickRetry} type="button">
        Retry
      </button>
    </div>
  );
};

export default FailureView;
