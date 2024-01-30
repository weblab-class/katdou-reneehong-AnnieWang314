import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./Profile";
import { post } from "../../../utilities";
import "./EditProfile.css";
import Unauth from "../intermediate/Unauth";

type Props = {
  userId: string | undefined;
};

const EditProfile = (props: Props) => {
  const [color, setColor] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (color) {
      post("/api/updatecolor", { color })
        .then(() => {
          console.log("Color updated");
        })
        .catch((error) => {
          console.error("Error updating color: ", error);
        });
    }
    if (aboutMe) {
      post("/api/updateaboutme", { aboutMe })
        .then(() => {
          console.log("About me updated");
        })
        .catch((error) => {
          console.error("Error updating about me: ", error);
        });
    }
  };
  if (!props.userId) {
    window.location.replace("/unauth");
    return <Unauth />;
  }
  return (
    <div className="EditProfile-container">
      <div className="EditProfile-title">edit profile</div>
      <form onSubmit={handleSubmit}>
        <div className="EditProfile-userColor-container">
          <div className="EditProfile-userColor-title">change profile color here: </div>{" "}
          {/* Note: class -> className */}
          <input
            className="EditProfile-userColor-searchBar"
            type="text"
            name="color"
            value={color}
            onChange={handleColorChange}
            placeholder="#XXXXXX"
          />
        </div>
        <div className="EditProfile-aboutMe-container">
          <div className="EditProfile-aboutMe-title">update about me: </div>{" "}
          {/* Note: class -> className */}
          <input
            className="EditProfile-aboutMe-searchBar"
            type="text"
            name="aboutMe"
            value={aboutMe}
            onChange={handleAboutMeChange}
            placeholder="write text here..."
          />
        </div>

        <button type="submit" className="EditProfile-submitButton">
          save changes
        </button>
      </form>
      <Link to="/profile" style={{ textDecoration: "none" }} className="EditProfile-backButton">
        back
      </Link>
    </div>
  );
};

export default EditProfile;
