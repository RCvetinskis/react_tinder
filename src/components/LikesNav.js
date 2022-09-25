import React from "react";

const LikesNav = ({
  setShowMyLikes,
  setShowLikedBy,
  myLikesLength,
  likedByLength,
  setBackEndUsers,
  showMyLikes,
  showLikedBy,
}) => {
  function showLikes() {
    setBackEndUsers("myLikes");
    setShowMyLikes(true);
    setShowLikedBy(false);
  }

  function showLikedByFnc() {
    setBackEndUsers("likedBy");
    setShowLikedBy(true);
    setShowMyLikes(false);
  }
  return (
    <ul className="likes-nav flex justify-center gap-5 items-center">
      <li
        style={
          showMyLikes ? { borderBottom: "5px solid white" } : { border: "none" }
        }
        onClick={showLikes}
      >
        My likes ({myLikesLength})
      </li>
      <li
        style={
          showLikedBy ? { borderBottom: "5px solid white" } : { border: "none" }
        }
        onClick={showLikedByFnc}
      >
        Liked By ({likedByLength})
      </li>
    </ul>
  );
};

export default LikesNav;
