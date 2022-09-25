import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MyLikes = ({ likedUser }) => {

    const settings = {
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 2,
        lazyLoad: true,
        autoplaySpeed: 2000,
      };

  return   <div className="single-user-card  text-white text-center font-bold">
  <Slider {...settings}>
     {likedUser.pictures.map((x, i) => (
       <div key={i}>
         <img src={x} />
       </div>
     ))}
   </Slider>
 <h3 className="capitalize">{likedUser.username}</h3>
 <h3>Age: {likedUser.age}</h3>
 <h3>Gender: {likedUser.gender}</h3>
 <h3>Location: {likedUser.city}</h3>
</div>;
};

export default MyLikes;
