import React, { useContext } from "react";
import mainContext from "../context/MainContext";

const AutoLogin = () => {
  const { setAutoLoginStatus } = useContext(mainContext);
  function stayLoggedIn(e) {
    setAutoLoginStatus(true);
    localStorage.setItem("autologin", String(e.target.checked));
  }

  return (
    <div className="stay-logedin-container">
      <label htmlFor="logedIn">
        Stay loged in
        <input
          type="checkbox"
          id="logedIn"
          name="logedIn"
          onChange={stayLoggedIn}
        />
      </label>
    </div>
  );
};

export default AutoLogin;
