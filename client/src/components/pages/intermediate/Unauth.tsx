import React from "react";
import { Link } from "react-router-dom";
import "./Unauth.css";

const Unauth = () => {
  return (
    <div className="Unauth-container">
      <h1 className="Unauth-title">YOU ARE NOT LOGGED IN AND CANNOT ACCESS THIS PAGE</h1>
      <div>
        have an account?{" "}
        <Link to="/login" className="purple-link">
          log in.
        </Link>
      </div>
    </div>
  );
};

export default Unauth;
