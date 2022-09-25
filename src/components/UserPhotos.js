import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UserPhotos = ({ photos, setOpenPhotos }) => {
  const settings = {
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    lazyLoad: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="img-container ">
      <i
        onClick={() => setOpenPhotos(false)}
        className="fa-solid fa-door-closed"
      ></i>
      <Slider {...settings}>
        {photos.map((x, i) => (
          <div key={i}>
            <img src={x} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default UserPhotos;
