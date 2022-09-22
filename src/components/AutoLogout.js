import React, { useContext } from "react";
import mainContext from "../context/MainContext";

const AutoLogout = () => {
    const {setAutoLoginStatus, autoLoginStatus} = useContext(mainContext)

    function logOut(){
    fetch("http://localhost:4000/logout", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials:"include",
 
  })
  .then(response => {
      return response.json( )
  })
  .then(data => {
    localStorage.setItem("autologin", "false")
    setAutoLoginStatus(false)
  } );

}

  return <div className="flex">
        {autoLoginStatus &&
         <button className="logout" onClick={logOut}> Click to turn off autologin</button>
        }
   
  </div>;
};

export default AutoLogout;
