import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainContext from "../context/MainContext";
import AutoLogin from "./AutoLogin";
const Login = ({ setShowLogin, showLogin, setErrorMsg, setShowErr }) => {
  const { setAutoLoginStatus, setUser, setUsers, socket } =
    useContext(mainContext);
  //state for checkbox

  const nameRef = useRef();
  const passRef = useRef();
  const nav = useNavigate();
  // autogin, checks if in localstorage autoloing is selected, and sends to back anwser, if user is selected sets user to be autologedin
  useEffect(() => {
    const autologin = localStorage.getItem("autologin");
    if (autologin === "true") {
      fetch("http://localhost:4000/stay-logedin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (!data.error) {
            setUser(data.data);
            nav("/profile");
            setAutoLoginStatus(true);
          }
        });
    }
  }, []);

  function logIn() {
    const objValues = {
      username: nameRef.current.value,
      password: passRef.current.value,
    };
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(objValues),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMsg(data.message);
          setShowErr(true);
          setUser(null);
        } else {
          // on login sets user and sets all users by current user  filter
          setShowLogin(true);
          setShowErr(false);
          setUser(data.user);
          socket.emit("login", data.user);
          setUsers(data.users);
          nav("/profile");
        }
      });
  }
  return (
    <div className="login gap-3 flex flex-col items-center justify-center h-50 m-5 p-5">
      <input ref={nameRef} type="text" placeholder="username" />
      <input ref={passRef} type="password" placeholder="password" />
      <AutoLogin />

      <button className="login-btn" onClick={logIn}>
        Log in
      </button>

      <div className="text-container">
        <p className="mr-3">Back to Register</p>

        <i
          onClick={() => setShowLogin(!showLogin)}
          className="arrow fa-solid fa-arrow-right"
        ></i>
      </div>
    </div>
  );
};

export default Login;
