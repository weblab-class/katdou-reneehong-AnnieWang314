import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Words from "./pages/Words";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import Navbar from "./Navbar";
import "./App.css";
//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string>("");
  const [aboutMe, setAboutMe] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("#d5d1ff");
  const [userDate, setUserDate] = useState<string>("joined today!");
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // They are registered in the database and currently logged in.
          setUserId(user._id);
          setUserName(user.name);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserName(user.name);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserName("");
    post("/api/logout");
    setUserDate("last seen on " + currentDate);
  };

  return (
    <div className="App-container">
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} userId={userId} />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route
            element={
              <Login handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
            }
            path="/login"
          />
          <Route element={<Words />} path="/words" />
          <Route
            element={
              <Profile
                userName={userName}
                userDate={userDate}
                aboutMe={aboutMe}
                userColor={userColor}
              />
            }
            path="/profile"
          />
          <Route element={<Learn />} path="/learn" />
          <Route element={<EditProfile />} path="/editprofile" />
          <Route element={<Settings />} path="/settings" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
