/*
  .edit
    -- edit <SideBar> into Route because loginpage don't have <Sidebar>
  .edit 11-Apr-20
    -- edit guest flow control, redirect to /login.
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

import accountAccess from '../components/avatar/accountAccess.js';
 
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export default () => {

  let isGuest = accountAccess().getAccountId() === 36;

  return (
    <Router>
 
      <Navbar />

      {
        !isGuest ?
        /// Switch for users.
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
  
          <Route exact path="/">
            <SideBar />
            <Home></Home>
          </Route>

        </Switch> 
        :
        /// Switch for guests.
        <Switch>
          <Route exact path='/login'>
            <Login></Login>
          </Route>

          <Route exact path="/">
            <SideBar />
            <Home></Home>
          </Route>

          <Redirect to='/login' />
        </Switch>
      }
    </Router>
  );
};
