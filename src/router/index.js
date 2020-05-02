/*
  .edit
    -- edit <SideBar> into Route because loginpage don't have <Sidebar>
  .edit 11-Apr-20
    -- edit guest flow control, redirect to /login.
  .edit 14-Apr-20
    -- add NotFound page.
*/

import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

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
import NotFound from '../pages/notFound/index.js';

import accountAccess from '../components/avatar/accountAccess.js';

import rootReducer from '../redux/reducers/index.js';

export const store = createStore(rootReducer, applyMiddleware(logger))

export default () => {

  let isGuest = accountAccess().getAccountId() === 36;

  return (
    <Provider store={store}>
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
                <Redirect to='/' />
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

              <Route>
                <NotFound />
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
    </Provider>
  );
};
