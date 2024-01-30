import React, { useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
            <NavLink
              to="/words"
              className={({ isActive }) => (isActive ? "active-link" : "black-link")}
            >
              words
            </NavLink>
            <NavLink
              to="/learn"
              className={({ isActive }) => (isActive ? "active-link" : "black-link")}
            >
              learn
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "black-link")}
            >
              profile
            </NavLink>
            <div onClick={handleLogout} className="Navbar-start Navbar-logout">
              logout
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="Navbar-start">
              start now
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
