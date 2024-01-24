import React, { useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import logoUrl from "../assets/logo.svg";
import "./Navbar.css";

type Props = {
  userId: string | undefined;
  handleLogout: () => void;
};

const Navbar = (props: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.handleLogout();
    googleLogout();
    navigate("/login");
  };

  return (
    <nav className="Navbar-container">
      <div className="Navbar-left">
        <Link to="/" className="Navbar-logo-container">
          <img src={logoUrl} alt="Logo" className="Navbar-logo" />
        </Link>
      </div>
      <div className="Navbar-right">
        <a href="/#about" className="black-link">
          about
        </a>
        {props.userId ? (
          <>
            <Link to="/words" className="black-link">
              words
            </Link>
            <Link to="/learn" className="black-link">
              learn
            </Link>
            <Link to="/profile" className="black-link">
              profile
            </Link>
            <div onClick={handleLogout} className="Navbar-start Navbar-logout u-openSans500">
              logout
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="Navbar-start u-openSans500">
              start now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
