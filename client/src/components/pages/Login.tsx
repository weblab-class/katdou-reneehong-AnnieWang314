import React from "react";
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
  const { handleLogin } = props;

  return (
    <div className="Login-container">
      <div>log in</div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {props.userId ? (
          <button
            onClick={() => {
              googleLogout();
            }}
          >
            log out
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Error Logging in")} />
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
