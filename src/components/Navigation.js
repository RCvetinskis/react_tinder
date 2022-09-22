import React, { useContext } from "react";
import { Link } from "react-router-dom";
import mainContext from "../context/MainContext";
const Navigation = () => {
  const { setUser } = useContext(mainContext);

  return (
    <ul className=" nav flex justify-around">
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
  );
};

export default Navigation;
