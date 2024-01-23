import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile-container">
      <div className="Profile-person">
        <img className="Profile-photo" src="./me.jpg" alt="Profile" />
        <div className="Profile-info">
          <div className="Profile-user">
            <div className="Profile-username">@username</div>
            <div className="Profile-joinDate">joined xx/xx/xx</div>
          </div>
          <div className="Profile-bio">about me section test test</div>
        </div>
      </div>

      <div className="Profile-buttons">
        <div className="Profile-button">edit profile</div>
        <div className="Profile-button">my friends</div>
        <div className="Profile-button">chat</div>
        <div className="Profile-button">settings</div>
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
