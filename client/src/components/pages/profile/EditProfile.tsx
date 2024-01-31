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
    let promises: Promise<void>[] = [];

    if (color) {
      const colorPromise = post("/api/updatecolor", { color })
        .then(() => {
          console.log("Color updated");
        })
        .catch((error) => {
          console.error("Error updating color: ", error);
        });
      promises.push(colorPromise);
    }

    if (aboutMe) {
      const aboutMePromise = post("/api/updateaboutme", { aboutMe })
        .then(() => {
          console.log("About me updated");
        })
        .catch((error) => {
          console.error("Error updating about me: ", error);
        });
      promises.push(aboutMePromise);
    }

    Promise.all(promises).then(() => {
      // Redirect to a new page after both requests are completed
      window.location.href = "/profile"; // Replace '/new-page-url' with the URL you want to redirect to
    });
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
