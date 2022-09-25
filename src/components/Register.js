import React, { useContext, useRef } from "react";
import { cities } from "../cities/Cities";
import mainContext from "../context/MainContext";

const Register = ({ setShowLogin, showLogin, setErrorMsg, setShowErr }) => {
  const nameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();
  const ageRef = useRef();
  const cityRef = useRef();
  const genderRef = useRef();
  const preferenceRef = useRef();

  function registerUser() {
    const objectValues = {
      username: nameRef.current.value,
      passOne: passOneRef.current.value,
      passTwo: passTwoRef.current.value,
      age: Number(ageRef.current.value),
      city: cityRef.current.value,
      gender: genderRef.current.value,
      preference: preferenceRef.current.value,
    };

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(objectValues),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMsg(data.message);
          setShowErr(true);
        } else {
          setShowLogin(true);
          setShowErr(false);
        }
      });
  }

  return (
    <div className="register flex flex-col items-center gap-3 justify-center h-50 m-5 p-5">
      <input ref={nameRef} type="text" placeholder="username" />
      <input ref={passOneRef} type="password" placeholder="password" />
      <input ref={passTwoRef} type="password" placeholder="repeat-password" />
      <input
        ref={ageRef}
        className={"age"}
        type="number"
        placeholder="age"
        min={18}
        max={100}
      />

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

      <div className="gender-container">
        <p>Gender:</p>
        <select ref={genderRef} name="gender" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="intrests-container">
        <p>Who do you prefer to date:</p>
        <select ref={preferenceRef} name="gender" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <button className="register-btn" onClick={registerUser}>
        Register
      </button>

      <div className="text-container">
        <p>Already have a user? Click here to login </p>
        <i
          onClick={() => setShowLogin(!showLogin)}
          className="arrow fa-solid fa-arrow-right"
        ></i>
      </div>
    </div>
  );
};

export default Register;
