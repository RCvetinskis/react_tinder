import React from "react";

const ItsAMatch = ({thisUser}) => {
  return <div className="aMatch">
    {thisUser && 
     <div>
     <h2 className=" text-red-400 flex flex-col justify-center items-center">
     Congratulations, you matched with:
     <span className="capitalize ">{thisUser.username}</span>
     <span>Age: {thisUser.age}</span>
     </h2>
     <div className="flex justify-center image-container">
       <img src={  thisUser.pictures[0]} alt="" />
       </div>
     </div>
    }
   
    </div>

};

export default ItsAMatch;
