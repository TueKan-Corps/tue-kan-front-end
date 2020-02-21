import React from "react";

import Navbar from '../components/nav-bar/index.js';
import SideBar from '../components/sideBar/index.js';

import Home from "../pages/home"; 
import NewCreatePost from '../pages/newCreatePost/index.js';
import Ticket from '../pages/ticket/index.js';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Router>

      <SideBar />
      <Navbar />

      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>

        <Route path="/posting">
        </Route>

        <Route path="/ticket">
          <Ticket />
        </Route>

        <Route path="/createPost">
          <NewCreatePost />
        </Route>

        <Route exact path="/">
          <Home></Home>
        </Route>

      </Switch>
    </Router>
  );
};
