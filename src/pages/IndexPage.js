import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import ErrorAlert from "../components/ErrorAlert";
const IndexPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  return (
    <div>
 
      <div className="index-container  ">
      {showLogin === true ? (
        <Login setShowLogin={setShowLogin} showLogin={showLogin} setErrorMsg={setErrorMsg}  setShowErr={setShowErr}/>
      ) : (
        <Register setErrorMsg={setErrorMsg}  setShowLogin={setShowLogin} showLogin={showLogin} setShowErr={setShowErr} />
      )}
    </div>
    {showErr &&
        <ErrorAlert errorMsg={errorMsg} />
    }

    </div>
  );
};

export default IndexPage;
