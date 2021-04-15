import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { refreshTokenSetup } from "../refreshTokenSetup";
import axios from "axios";

const Nav = () => {
  const [expanded, setExpanded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const onLogin = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const person = res as GoogleLoginResponse;
    setSignedIn(true);
    refreshTokenSetup(person);
  };
  const onLogout = () => {
    setSignedIn(false);
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
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" href="https://bulma.io">
          Coffee Track
        </Link>

        <a
          role="button"
          className={"navbar-burger " + (expanded ? "is-active" : "")}
          aria-label="menu"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={"navbar-menu " + (expanded ? "is-active" : "")}
      >
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-primary" to="/submit">
                <strong>New Entry</strong>
              </Link>
              <Link className="button is-secondary" to="/search">
                Search
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">{signedIn ? <Logout /> : <SignIn />}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
