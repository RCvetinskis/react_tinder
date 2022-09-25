import React, { useContext, useRef, useState } from "react";
import mainContext from "../context/MainContext";
import ImageSlider from "../components/ImageSlider";
import AutoLogout from "../components/AutoLogout";
const ProfilePage = () => {
  const { user, setUser, socket } = useContext(mainContext);
  const [errorMsg, setErrorMsg] = useState("");
  const photoRef = useRef();

  function addPhoto() {
    const objValue = {
      photo: photoRef.current.value,
      _id: user._id,
    };

    fetch("http://localhost:4000/addPicutres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objValue),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.error) {
          setUser(data.data);
          photoRef.current.value = "";
          setErrorMsg("");
        } else {
          setErrorMsg(data.message);
        }
      });
  }
  return (
    <div className="profile-page flex items-center justify-center flex-wrap-reverse ">
      <div className="profile-card ">
        <h3 className="text-red-600 font-bold text-center">{errorMsg}</h3>
        {user.pictures.length < 2 ? (
          <h3 className="text-red-600 font-bold text-center">
            To use application you have to upload atleast 2 pictures
          </h3>
        ) : (
          ""
        )}

        <ImageSlider pictures={user.pictures} />
        <div className="flex gap-5 justify-center items-center">
          <input
            className="photo-input"
            ref={photoRef}
            type="text"
            placeholder="photo-url"
          />
          <button className="add-photo" onClick={addPhoto}>
            Add Photo
          </button>
        </div>
        <div className="text-center text-slate-300 mt-5 text-lg	">
          <p className="capitalize">
            Username: <span>{user.username}</span>
          </p>
          <p>
            Gender: <span>{user.gender}</span>
          </p>
          <p>
            City: <span>{user.city}</span>
          </p>
          <p>
            Age: <span>{user.age}</span>
          </p>
        </div>
      </div>
      ;
      <AutoLogout />
    </div>
  );
};

export default ProfilePage;
