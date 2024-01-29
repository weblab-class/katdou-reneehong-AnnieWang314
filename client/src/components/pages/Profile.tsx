import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import "./Profile.css";
import Unauth from "./Unauth";

type Props = {
  userName: string;
  userDate: string;
  aboutMe: string;
  userColor: string;
  userId: string | undefined;
};
const Profile = (props: Props) => {
  const { userName, userDate, aboutMe, userColor, userId } = props;
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1); // Months are 0-based
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [month, day, year].join("/");
  }

  const formattedUserDate = formatDate(userDate);

  if (!userId) {
    window.location.replace("/unauth");
    return <Unauth />;
  }

  return (
    <div className="Profile-container">
      <div className="Profile-person">
        <div style={{ backgroundColor: userColor }} className="Profile-photo"></div>
        <div className="Profile-info">
          <div className="Profile-user">
            <div className="Profile-username">@{userName}</div>
            <div className="Profile-joinDate">last seen {formattedUserDate}</div>
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
