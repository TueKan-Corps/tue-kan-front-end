/*
  .edit 15-Mar-20
    -- edit coin data to use data from <profileData.js> in <avatar> folder.
*/

import React from 'react';

import './style.css';

import logo from '../../assets/icon/weblogo_white.png';

import  { profileData } from '../avatar/profileData.js';

import { Link } from "react-router-dom";

class Navbar extends React.Component {

  render () {
    return (
      <nav className='navbar-container'>
        <Link to='/'>
          <div className='logo-box'>
            <img className='logo' src={logo} alt='web-logo' />
          </div>
        </Link>

        <Link to='/coinPayment'>
          <div className='coin-box'>
            <i className="coin-messege coin-logo fas fa-coins"></i>
            <p className='coin-messege coin-amount'><b>{profileData.coin}</b></p>
            <p className='coin-messege coin-ex'><b>TC</b></p>
          </div>
        </Link>
      </nav>
    );
  }

}

export default Navbar;
