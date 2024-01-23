import React from "react";
import { Link } from "react-router-dom";
import logoUrl from "../assets/logo.svg";
import "./Navbar.css";

type Props = {
  userId: string | undefined;
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
        {props.userId !== undefined ? (
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
            <button onClick={props.handleLogout}>logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>start now</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
