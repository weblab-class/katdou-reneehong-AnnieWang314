import React from "react";
import logoUrl from "../../../assets/logo.svg";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="Loading-container">
      <div className="Loading-header">
        <img src={logoUrl} alt="Logo" className="Loading-logo" />
      </div>
      <div className="Loading-spinner-container">
        <div className="Loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
