import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { get, post } from "../utilities";
import NotFound from "./pages/intermediate/NotFound";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Words from "./pages/words/Words";
import Learn from "./pages/learn/Learn";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/profile/Settings";
import EditProfile from "./pages/profile/EditProfile";
import MCs from "./pages/learn/exercises/MCs";
import Flashcards from "./pages/learn/Flashcards";
import Exercises from "./pages/learn/exercises/Exercises";
import Loading from "./pages/intermediate/Loading";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import Term from "../../../shared/Term";
import "../utilities.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import Navbar from "./Navbar";
import Unauth from "./pages/intermediate/Unauth";
import "./App.css";
//TODO(weblab student): REPLACE WITH YOUR OWN CLIENT_ID

const App = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [date, setDate] = useState("");
  const [words, setWords] = useState<Term[]>([]);
  const [wordsCompleted, setWordsCompleted] = useState([
    "hello",
    "hi",
    "yipee",
    "gang",
    "hi",
    "yipee",
    "gang",
    "hi",
    "yipee",
    "gang",
  ]);

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
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (userId) {
      get("/api/usercolor").then((response) => {
        setColor(response.color);
      });

      get("/api/useraboutme").then((response) => {
        setAboutMe(response.aboutMe);
      });

      get("/api/userdate").then((response) => {
        setDate(response.date);
      });

      socket.on("userColorChanged", (newColor) => {
        setColor(newColor);
      });

      socket.on("userAboutMeChanged", (newAboutMe) => {
        setAboutMe(newAboutMe);
      });

      socket.on("connect", () => {
        post("/api/initsocket", { socketid: socket.id });
      });
    }

    return () => {
      socket.off("userColorChanged");
      socket.off("userAboutMeChanged");
    };
  }, [userId]);

  useEffect(() => {
    get("/api/terms")
      .then((data) => {
        setWords(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleLogin = (credentialResponse: CredentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken as string) as { name: string; email: string };
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setColor(user.color);
      setAboutMe(user.aboutme);
      setUserName(user.name);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserName("");
    post("/api/updatedate", { date: new Date().toISOString() })
      .then(() => {
        console.log("Date updated");
      })
      .catch((error) => {
        console.error("Error updating date: ", error);
      });
    post("/api/logout");
  };

  if (loading) {
    return (
      <div className="App-container">
        <Loading />
      </div>
    );
  }

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
          <Route element={<Words words={words} userId={userId} />} path="/words" />
          <Route element={<Unauth />} path="/unauth" />
          <Route
            element={
              <Profile
                userId={userId}
                userName={userName}
                userDate={date}
                aboutMe={aboutMe}
                userColor={color}
                wordsCompleted={wordsCompleted}
                totalWordCount={words.length}
              />
            }
            path="/profile"
          />
          <Route element={<Learn userId={userId} />} path="/learn" />
          <Route element={<EditProfile userId={userId} />} path="/editprofile" />
          <Route
            element={<Settings handleLogout={handleLogout} userId={userId} />}
            path="/settings"
          />
          <Route element={<Flashcards userId={userId} />} path="/learn/flashcards" />
          <Route element={<Exercises words={words} userId={userId} />} path="/learn/exercises" />
          <Route element={<MCs userId={userId}  />} path="/learn/mcs" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
