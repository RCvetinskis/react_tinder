import React, { useContext, useRef, useState, useEffect } from "react";
import mainContext from "../context/MainContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserPhotos from "../components/UserPhotos";
import ItsAMatch from "../components/ItsAMatch";
const SwipePage = () => {
  const { users, user, setUsers, setUser, socket } = useContext(mainContext);
  const [openPhotos, setOpenPhotos] = useState(false);
  const [userPhotos, setUserPhotos] = useState(null);
  const [showItsAMatch, setShowItsAMatch] = useState(false);
  const [getLikedUser, setLikedUser] = useState(null);
  // ref to get slider props
  const sliderRef = useRef(null);

  function showPictures(pictures) {
    setUserPhotos(pictures);
    setOpenPhotos(!openPhotos);
  }

  // slider settings
  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplaySpeed: 2000,
    draggable: false,
    arrows: false,
    speed: 500,
  };

  function like(myLikedUser) {
    socket.emit("likedUser", myLikedUser._id);
    // sets likedUser
    setLikedUser(myLikedUser);
    // changes picture
    sliderRef.current.slickNext();

    // removes liked user from arrray
    const likedUser = users.filter((x) => x._id !== myLikedUser._id);
    setUsers(likedUser);

    // sends  user to backend to  update current user likes list
    const obj = {
      myUserId: user._id,
      likedUserId: myLikedUser._id,
    };

    fetch("http://localhost:4000/like", {
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
          console.log(data.message);
        } else {
          setUser(data.data);
        }
      });

    // sets showmatch state if u ared liked by user to true
    if (user.likedBy.includes(myLikedUser._id)) {
      setShowItsAMatch(true);
      // after 3 seconds removes its a match notification
      setTimeout(function () {
        setShowItsAMatch(false);
        setLikedUser(null);
      }, 3000);
    }
  }

  function dislike(dislikedUserId) {
    // changes picture
    sliderRef.current.slickPrev();

    const dislikedUser = users.filter((x) => x._id !== dislikedUserId);
    setUsers(dislikedUser);

    const obj = {
      myUserId: user._id,
      dislikedUserId,
    };

    fetch("http://localhost:4000/dislike", {
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
          console.log(data.message);
        } else {
          setUser(data.data);
        }
      });
  }
  return (
    <div className="swipining-container flex justify-center items-center mt-10">
      {/* shows itsamatch notification */}
      {showItsAMatch && <ItsAMatch thisUser={getLikedUser} />}
      {/* if photo cliked opens photos caruseal */}
      {openPhotos && (
        <div className="singleUserPhotosContainer">
          <div className="slider-container">
            <UserPhotos setOpenPhotos={setOpenPhotos} photos={userPhotos} />
          </div>
        </div>
      )}

      {users.length > 0 ? (
        <div className="card-container">
          <Slider ref={sliderRef} {...settings}>
            {users.map((x, i) => (
              <div key={i} className="single-card ">
                <img
                  className="img-swipe"
                  onClick={() => showPictures(x.pictures)}
                  width={"200px"}
                  src={x.pictures[0]}
                  alt=""
                />
                <h3 className="capitalize">
                  Name: <span className=" font-bold">{x.username}</span>
                </h3>
                <h3>
                  Age: <span className=" font-bold">{x.age}</span>
                </h3>
                <h3>
                  City: <span className=" font-bold">{x.city}</span>
                </h3>

                <div className="btn-container m-5 flex justify-around items-center">
                  <button onClick={() => like(x)} style={{ width: 150 }}>
                    Like
                  </button>
                  <button onClick={() => dislike(x._id)} style={{ width: 150 }}>
                    Dislike
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="no-users-card">
          <h3>Thats all users, use filter or wait for new users</h3>
        </div>
      )}
    </div>
  );
};

export default SwipePage;
