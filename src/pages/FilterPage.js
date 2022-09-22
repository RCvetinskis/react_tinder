import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../cities/Cities";
import mainContext from "../context/MainContext";

const FilterPage = () => {
  // state to display selected age from range
  const [getAge, setAge] = useState(50);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUsers, users, user } = useContext(mainContext);
  const cityRef = useRef();
  const preferenceRef = useRef();
  const ageRef = useRef();
  const nav = useNavigate();

  function filter() {
    const obj = {
      city: cityRef.current.value,
      preference: preferenceRef.current.value,
      age: Number(ageRef.current.value),
      _id: user._id,
    };

    fetch("http://localhost:4000/filterMatches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMsg(data.message);
        } else {
          console.log(data);
          setErrorMsg("");
          setUsers(data.data);
          nav("/swipe");
        }
      });
  }

  return (
    <div className="filter">
      <h3 className="text-red-600 ">{errorMsg}</h3>
      <div className="cities-container">
        <p>Choose your location:</p>
        <select ref={cityRef} name="cities" id="cities">
          {cities.map((x, i) => (
            <option key={i} value={x.city}>
              {x.city}
            </option>
          ))}
        </select>
      </div>
      <div className="preference-container">
        <p>Who do you prefer to date:</p>
        <select ref={preferenceRef} name="gender" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="range-age">
        <p>Select Age: {getAge}</p>
        <span>18</span>
        <input
          onChange={(e) => setAge(e.target.value)}
          ref={ageRef}
          type="range"
          name="age"
          id="age"
          min={18}
          max={100}
        />
        <span>100</span>
      </div>
      <button onClick={filter}>Save Filter</button>
    </div>
  );
};

export default FilterPage;
