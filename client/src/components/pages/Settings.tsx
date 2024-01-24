import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import "./Settings.css";
import Unauth from "./Unauth";

type Props = {
  userId: string | undefined;
};

const Settings = (props: Props) => {
  if (!props.userId) {
    window.location.replace("/unauth");
    return <Unauth />;
  }
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
