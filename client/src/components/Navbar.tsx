import React from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/logo.svg";
import "./Navbar.css";

type Props = {
  userId?: string;
  handleLogout: () => void;
};

const Navbar = (props: Props) => {
  return (
    <nav className="Navbar-container">
      <div className="Navbar-left">
        <Link to="/" className="Navbar-logo-container">
          <img src={logoUrl} alt="Logo" className="Navbar-logo" />
        </Link>
      </div>
      <div className="Navbar-right">
        <a href="#about" className="black-link">
          about
        </a>
        <Link to="/login">
          <button>start now</button>
        </Link>
        {/* <Link to="/words">words</Link>
        <Link to="/learn">learn</Link>
        <Link to="/profile">profile</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
