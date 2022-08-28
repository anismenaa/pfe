import React from "react";

const Card = ({ title, img, content }) => {


  return(
    <div className="card text-white bg-dark mb-3 w-25">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  )
}

export default Card