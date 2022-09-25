import React, { useContext } from "react";
import { Link } from "react-router-dom";
import mainContext from "../context/MainContext";
const Navigation = () => {
  const { setUser, user } = useContext(mainContext);

  return (
    <div className=" nav ">
      {user.pictures.length < 2 ?
      <ul className="flex justify-around items-center">
      <li>
        <Link onClick={() => setUser(null)} to={"/"}>
          Logout
        </Link>
      </li>
      <li>
        <Link to={"/profile"}>Profile</Link>
      </li>
        
      </ul>
      :
      <ul className="flex justify-between items-center">
     <li>
        <Link onClick={() => setUser(null)} to={"/"}>
          Logout
        </Link>
      </li>
      <li>
        <Link to={"/profile"}>Profile</Link>
      </li>
      <li>
        <Link to={"/filter"}>Filter</Link>
      </li>
      <li>
        <Link to={"/swipe"}>Swipe</Link>
      </li>
      <li>
        <Link to={"/likes"}>likes</Link>
      </li>
     </ul>

      }
      
     
     
    
    </div>
  );
};

export default Navigation;
