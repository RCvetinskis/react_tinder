import React, { useContext } from "react";

const ErrorAlert = ({errorMsg}) => {

  return <div className="error">
    <h3>{errorMsg}</h3>
  </div>;
};

export default ErrorAlert;
