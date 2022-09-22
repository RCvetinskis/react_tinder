import React, { useContext } from "react";
import mainContext from "../context/MainContext";
const UserCard = () => {
  const { user } = useContext(mainContext);
  console.log(user);
  return <div className="card">
    <div >
    <img src={user.picture} alt="" />
    </div>
    <div className="text-center   text-white">
    <p >Username: <span>{user.username}</span></p>
    <p>Gender: <span>{user.gender}</span></p>
    <p>City: <span>{user.city}</span></p>
    <p>Age: <span>{user.age}</span></p>
    </div>
  </div>;
};

export default UserCard;
