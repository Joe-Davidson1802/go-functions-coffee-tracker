import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { refreshTokenSetup } from "../refreshTokenSetup";
import store from "../store";
import React from "react";

export const Login = () => {
  const signedIn = store.useState((s) => s.isSignedIn);

  const onLogin = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const person = res as GoogleLoginResponse;
    store.update((s) => {
      s.isSignedIn = true;
    });
    refreshTokenSetup(person);
  };
  const onLogout = () => {
    store.update((s) => {
      s.isSignedIn = false;
    });
  };
  const onFailedLogin = (res: GoogleLoginResponse) => {
    console.log("Logged: ", res.profileObj);
  };

  const SignIn = () => {
    return (
      <GoogleLogin
        clientId={
          process.env.REACT_APP_GOOGLE_CLIENT_ID
            ? process.env.REACT_APP_GOOGLE_CLIENT_ID
            : ""
        }
        buttonText="Login with Google"
        onSuccess={onLogin}
        onFailure={onFailedLogin}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
    );
  };
  const Logout = () => {
    return (
      <GoogleLogout
        clientId={
          process.env.REACT_APP_GOOGLE_CLIENT_ID
            ? process.env.REACT_APP_GOOGLE_CLIENT_ID
            : ""
        }
        buttonText="Logout"
        onLogoutSuccess={onLogout}
      />
    );
  };

  return signedIn ? <Logout /> : <SignIn />;
};
