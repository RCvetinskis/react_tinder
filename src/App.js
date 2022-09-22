import { React, useState, useEffect } from "react";
import "./App.css";
import mainContext from "./context/MainContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import FilterPage from "./pages/FilterPage";
import SwipePage from "./pages/SwipePage";
function App() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [autoLoginStatus, setAutoLoginStatus] = useState(false);
  const values = {
    user,
    setUser,
    autoLoginStatus,
    setAutoLoginStatus,
    users,
    setUsers,
  };

  useEffect(() => {
    fetch("http://localhost:4000/allUsers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.error) {
          setUsers(data.data);
        }
      });
  }, [user]);
  console.log(users);
  return (
    <div className="xl:container xl:mx-auto  ">
      <mainContext.Provider value={values}>
        <BrowserRouter>
          {user && <Navigation />}
          <Logo />
          <Routes>
            <Route path="/" element={<IndexPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/filter" element={<FilterPage />}></Route>
            <Route path="/swipe" element={<SwipePage />}></Route>
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  );
}

export default App;
