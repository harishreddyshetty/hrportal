import React from "react";
import {Vortex} from "react-loader-spinner"
import "./index.css"

const LoadingView = () => {
  return (
    <div className="loader-container">
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
};

export default LoadingView;
