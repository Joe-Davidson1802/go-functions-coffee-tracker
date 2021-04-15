import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import BarcodeScanner from "./components/BarcodeScanner";
import SubmitRecord from "./pages/SubmitRecord";
import Home from "./pages/Home";
import axios from "axios";
import Search from "./pages/Search";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  return (
    <BrowserRouter>
      <Link to="/submit">New Record</Link>
      <br></br>
      <Link to="/search">Find grinds by barcode</Link>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/submit" exact component={SubmitRecord} />
        <Route path="/search" exact component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
