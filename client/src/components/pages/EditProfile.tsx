import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import "./EditProfile.css";

const EditProfile = () => {
  return (
    <div className="EditProfile-container">
      <div className="EditProfile-title">edit profile</div>
      <div className="EditProfile-userColor-container">
        <div className="EditProfile-userColor-title">change profile color here: </div>{" "}
        {/* Note: class -> className */}
        <form action="/search" method="get">
          <input
            className="EditProfile-userColor-searchBar"
            type="text"
            name="query"
            placeholder="#XXXXXX"
          />
        </form>
      </div>
      <div className="EditProfile-aboutMe-container">
        <div className="EditProfile-aboutMe-title">update about me: </div>{" "}
        {/* Note: class -> className */}
        <form action="/search" method="get">
          <input
            className="EditProfile-aboutMe-searchBar"
            type="text"
            name="query"
            placeholder="write text here..."
          />
        </form>
      </div>
      <Link to="/profile" style={{ textDecoration: "none" }} className="EditProfile-backButton">
        back
      </Link>
    </div>
  );
};

export default EditProfile;
