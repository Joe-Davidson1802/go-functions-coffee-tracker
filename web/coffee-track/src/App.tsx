import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import BarcodeScanner from "./components/BarcodeScanner";
import SubmitRecord from "./pages/SubmitRecord";
import Home from "./pages/Home";
import axios from "axios";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import store from "./store";
import { Login } from "./components/Login";

function SignedIn() {
  return (
    <>
      <Link className="button is-primary" to="/submit">
        <strong>New Entry</strong>
      </Link>
      <Link className="button is-secondary" to="/search">
        Search
      </Link>
    </>
  );
}

function NotSignedIn() {
  return <Login />;
}

function App() {
  const signedIn = store.useState((s) => s.isSignedIn);
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        {signedIn ? (
          <Route path="/submit" exact component={SubmitRecord} />
        ) : null}
        {signedIn ? <Route path="/search" exact component={Search} /> : null}
        {signedIn ? (
          <Route path="/" component={SignedIn} />
        ) : (
          <Route path="/" component={NotSignedIn} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
