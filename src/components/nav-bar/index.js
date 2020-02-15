import React from 'react';

import './style.css';

import logo from '../../assets/icon/weblogo_white.png';

import { Link } from "react-router-dom";

class Navbar extends React.Component {

  render () {
    return (
      <nav className='navbar-container'>
        <Link to='/home'>
          <div className='logo-box'>
            <img className='logo' src={logo} alt='web-logo' />
          </div>
        </Link>

        <Link to='coinPayment'>
          <div className='coin-box'>
            <i className="coin-messege coin-logo fas fa-coins"></i>
            <p className='coin-messege coin-amount'><b>120</b></p>
            <p className='coin-messege coin-ex'><b>TC</b></p>
          </div>
        </Link>
      </nav>
    );
  }

}

export default Navbar;
