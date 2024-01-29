import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="NotFound-container">
      <h1>the page you are looking for does not exist</h1>
      <div className="NotFound-bounce-container">
        <div className="NotFound-bounce NF-circle1"></div>
        <div className="NotFound-bounce NF-circle2"></div>
      </div>
    </div>
  );
};

export default NotFound;
