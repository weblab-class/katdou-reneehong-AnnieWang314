import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import "./Profile.css";

type Props = {
  userName: string;
  userDate: string;
  aboutMe: string;
  userColor: string;
};
const Profile = (props: Props) => {
  const { userName, userDate, aboutMe, userColor } = props;

  return (
    <div className="Profile-container">
      <div className="Profile-person">
        <div style={{ backgroundColor: userColor }} className="Profile-photo"></div>
        <div className="Profile-info">
          <div className="Profile-user">
            <div className="Profile-username">@{userName}</div>
            <div className="Profile-joinDate">{userDate}</div>
          </div>
          <div className="Profile-bio">{aboutMe}</div>
        </div>
      </div>

      <div className="Profile-buttons">
        <Link to="/editprofile" style={{ textDecoration: "none" }} className="Profile-button">
          edit profile
        </Link>
        <div className="Profile-button">my friends</div>
        <div className="Profile-button">chat</div>
        <Link to="/settings" style={{ textDecoration: "none" }} className="Profile-button">
          settings
        </Link>
      </div>

      <div className="Profile-progress-container">
        <div className="Profile-progress">
          <div className="Profile-progress-bar" style={{ width: "20%" }}></div>
        </div>
        <div className="Profile-wordCount">100/500 words completed</div>
      </div>
    </div>
  );
};

export default Profile;
