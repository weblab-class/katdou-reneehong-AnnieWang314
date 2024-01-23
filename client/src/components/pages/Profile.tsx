import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="Profile">
        <img className="Photo" src="./me.jpg" alt="Profile" />
        <div className="Info">
          <div className="User">
            <div className="Username">@username</div>
            <div className="JoinDate">joined xx/xx/xx</div>
          </div>
          <div className="Bio">about me section test test</div>
        </div>
      </div>

      <div className="Buttons">
        <div className="Button">edit profile</div>
        <div className="Button">my friends</div>
        <div className="Button">chat</div>
        <div className="Button">settings</div>
      </div>

      <div className="Progress">
        <div className="progress-bar" style={{ width: "20%" }}></div>
      </div>

      <div className="WordCount">100/500 words completed</div>
    </>
  );
};

export default Profile;
