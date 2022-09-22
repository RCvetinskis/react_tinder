import React, { useContext, useRef, useState } from "react";
import mainContext from "../context/MainContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserPhotos from "../components/UserPhotos";
const SwipePage = () => {
  const { users, user } = useContext(mainContext);
  const [openPhotos, setOpenPhotos] = useState(false);
  const [userPhotos, setUserPhotos]= useState(null)
  
    // ref to get slider props
    const sliderRef = useRef(null)

  function showPictures(pictures) {
    setUserPhotos(pictures)
    setOpenPhotos(!openPhotos);
  }


  const settings = {
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplaySpeed: 2000,
    draggable:false,
    arrows:false
    
  };

   
    function like(likedUserId){
      // changes picture
      sliderRef.current.slickNext()

      // sends  user to backend to  update current user likes list
      const obj ={
        myUserId: user._id,
        likedUserId
      }
      
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
          console.log(data)
        });
    }

    function dislike(password){
        // changes picture
      sliderRef.current.slickPrev()
      console.log(password)
    }
  return <div className="swipining-container flex justify-center items-center mt-10">

     {openPhotos && (
        <div className="singleUserPhotosContainer">
          <div className="slider-container">
          <UserPhotos
            setOpenPhotos={setOpenPhotos}
            photos={userPhotos}
          />
           </div>
        </div>
      )}

     <div className="card-container">
     <Slider ref={sliderRef} {...settings}>
        {users.map((x,i)=>
          <div key={i} className="single-card">
          <h3>Name: <span>{x.username}</span></h3>
          <h3>Age: <span>{x.age}</span></h3>
          <h3>City: <span>{x.city}</span></h3>
            <img
            className="img-swipe"
            onClick={()=>showPictures(x.pictures)}
              width={"200px"}
              src={x.pictures[0]}
              alt=""
            />
          
          <div className="btn-container m-5 flex justify-between items-center">
        <button onClick={()=>like(x._id)} style={{width:150}}>Like</button>
        <button onClick={()=>dislike(x._id)} style={{width:150}}>Dislike</button>
      </div>
          </div>
          
        )}
    
      </Slider>
      </div>
      


  </div>;
};

export default SwipePage;
