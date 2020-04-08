/*
  .edit
    -- edit <SideBar> into Route because loginpage don't have <Sidebar>
*/

import React from "react";

import './style.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../components/nav-bar/index.js';
import SideBar from '../components/sideBar/index.js';

import Home from "../pages/home";
import NewCreatePost from '../pages/newCreatePost/index.js';
import Ticket from '../pages/ticket/index.js';
import Posting from '../pages/posting/index.js';
import Login from '../pages/loginPage/index.js';
import Profile from '../pages/profile/index.js';
import CoinPayment from '../pages/coinPayment/index.js';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <Router>

      <Navbar />

      <Switch>

        <Route path="/coinPayment">
          <SideBar />
          <CoinPayment />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        
        <Route path="/profile">
          <SideBar />
          <Profile />
        </Route>

        <Route path="/home">
          <SideBar />
          <Home></Home>
        </Route>

        <Route path="/posting">
          <SideBar />
          <Posting />
        </Route>

        <Route path="/ticket">
          <SideBar />
          <Ticket />
        </Route>

        <Route path="/createPost">
          <SideBar />
          <NewCreatePost />
        </Route>

        <Route path="/createPost">
          <SideBar />
          <NewCreatePost />
        </Route>

        <Route exact path="/">
          <SideBar />
          <Home></Home>
        </Route>

      </Switch>
    </Router>
  );
};
