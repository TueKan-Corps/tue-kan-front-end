import React from "react";
import Home from "../pages/home";
import Navbar from '../components/nav-bar/index.js';
import SideBar from '../components/sideBar/index.js';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Router>

      <Navbar />

      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>

        <Route path="/posting">
          <SideBar />
        </Route>

        <Route exact path="/">
          <Home></Home>
        </Route>

      </Switch>
    </Router>
  );
};
