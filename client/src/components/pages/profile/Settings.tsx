import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import "./Settings.css";
import Unauth from "../intermediate/Unauth";

type Props = {
  userId: string | undefined;
  handleLogout: () => void;
};

const Settings = (props: Props) => {
  const navigate = useNavigate();
  if (!props.userId) {
    window.location.replace("/unauth");
    return <Unauth />;
  }
  const handleLogout = () => {
    props.handleLogout();
    googleLogout();
    navigate("/login");
  };
  return (
    <div className="Settings-container">
      <div className="Settings-title">settings</div>
      <div className="Settings-logOut-container">
        <div className="Settings-logOut-title">log out? </div>
        <div className="Settings-logOut-options">
          <div onClick={handleLogout} className="Settings-logOut-yes">
            yes
          </div>
          <Link to="/profile" style={{ textDecoration: "none" }} className="Settings-logOut-no">
            no
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
