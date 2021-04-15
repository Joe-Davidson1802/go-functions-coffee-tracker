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

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/submit" exact component={SubmitRecord} />
        <Route path="/search" exact component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
