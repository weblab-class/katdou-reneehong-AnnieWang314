import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
  CredentialResponse,
} from "@react-oauth/google";
import "./Login.css";

type Props = {
  userId: string | undefined;
  handleLogin: (credentialResponse: CredentialResponse) => void;
  handleLogout: () => void;
};

const GOOGLE_CLIENT_ID = "61715148833-ikdciqpnr0b30uoits0nc3nhq2187neb.apps.googleusercontent.com";

const Login = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.userId) {
      navigate("/profile");
    }
  }, [props.userId, navigate]);

  const handleLogout = () => {
    props.handleLogout();
    googleLogout();
  };

  const handleLogin = (credentialResponse: CredentialResponse) => {
    props.handleLogin(credentialResponse);
    // window.location.replace("/profile");
  };

  return (
    <div className="Login-container">
      <div className="Login-box">
        {props.userId ? (
          <>
            <div>you are already logged in</div>
            <div>want to log out?</div>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <button onClick={handleLogout}>logout</button>
            </GoogleOAuthProvider>
          </>
        ) : (
          <>
            <h2>log in</h2>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                width="14px"
                size="large"
                onSuccess={handleLogin}
                onError={() => console.log("Error Logging in")}
              />
            </GoogleOAuthProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
