import React, { useContext, useState, useEffect } from "react";
import MyLikes from "../components/MyLikes";
import LikedBy from "../components/LikedBy";
import LikesNav from "../components/LikesNav";
import mainContext from "../context/MainContext";

const LikesPage = () => {
  const { user } = useContext(mainContext);
  const [showMyLikes, setShowMyLikes] = useState(true);
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [backEndUsers, setBackEndUsers] = useState("myLikes");
  const [likesUsers, setLikesUsers] = useState([]);

  // fetches users by id's and sets them to likesUsers state
  useEffect(() => {
    const obj = {
      likes: user.likes,
      likedBy: user.likedBy,
      stateValue: backEndUsers,
    };
    fetch("http://localhost:4000/showLikedUsers", {
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
          setLikesUsers(data.data);
        }
      });
  }, [backEndUsers]);

  return (
    <div>
      <LikesNav
        myLikesLength={user.likes.length}
        likedByLength={user.likedBy.length}
        setShowMyLikes={setShowMyLikes}
        setShowLikedBy={setShowLikedBy}
        setBackEndUsers={setBackEndUsers}
        showMyLikes={showMyLikes}
        showLikedBy={showLikedBy}
      />
      {showMyLikes && (
        <div className="my-likes-container flex justify-center items-center gap-10 mt-5 flex-wrap">
          {likesUsers.map((x, i) => (
            <MyLikes key={i} likedUser={x} />
          ))}
        </div>
      )}
      {showLikedBy && (
        <div className="likedBy-container flex justify-center items-center gap-10 mt-20 flex-wrap">
          {likesUsers.map((x, i) => (
            <LikedBy key={i} likedByUser={x} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikesPage;
