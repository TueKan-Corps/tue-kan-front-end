import React from "react";
import Home from "../pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/about">
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
