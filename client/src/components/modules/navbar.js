import React from "react";

import "./navbar.css";

const NavBar = () => {
    return (
        <nav className = "NavBar-container">
            <div className = "NavBar-logo">slangz</div>
            <div className = "NavBar-path">
                <div className = "About">about</div>
                <div className = "Learn">learn</div>
                <div className = "Profile">profile</div>
            </div>
        </nav>
    );
};

export default NavBar;