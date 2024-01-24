import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="Settings-container">
      <div className="Settings-title">settings</div>
      <div className="Settings-logOut-container">
        <div className="Settings-logOut-title">log out? </div>
        <div className="Settings-logOut-options">
          <Link to="/profile" style={{ textDecoration: "none" }} className="Settings-logOut-yes">
            yes
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }} className="Settings-logOut-no">
            no
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
