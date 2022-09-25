import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LikedBy = ({ likedByUser }) => {

    const settings = {
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 2,
        lazyLoad: true,
        autoplaySpeed: 2000,
      };
  return <div>
     <div className="single-user-card  text-white text-center font-bold">
     <Slider {...settings}>
        {likedByUser.pictures.map((x, i) => (
          <div key={i}>
            <img src={x} />
          </div>
        ))}
      </Slider>
    <h3 className="capitalize">{likedByUser.username}</h3>
    <h3>Age: {likedByUser.age}</h3>
    <h3>Gender: {likedByUser.gender}</h3>
    <h3>Location: {likedByUser.city}</h3>
  </div>;
  </div>;
};

export default LikedBy;
