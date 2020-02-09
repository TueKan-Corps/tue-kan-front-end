import React from "react";
import Home from "../pages/home";
import Navbar from '../components/nav-bar/index.js';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default () => {
  return (
    <Router>

        <Navbar />

      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/users">
          <Home></Home>
        </Route>
        <Route path="/"></Route>
      </Switch>
    </Router>
  );
};
