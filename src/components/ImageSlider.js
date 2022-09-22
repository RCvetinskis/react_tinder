import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImageSlider = ({ pictures }) => {
  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    lazyLoad: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="imgslider">
      <Slider {...settings}>
        {pictures.map((x, i) => (
          <div key={i}>
            <img src={x} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
