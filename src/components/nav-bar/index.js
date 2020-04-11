/*
  .edit 15-Mar-20
    -- edit coin data to use data from <profileData.js> in <avatar> folder.
  .edit 02-Apr-20 
    -- [**1] fake account_id.
  .edit 07-Apr-20
    -- edit to use real data from real database.
  .edit 10-Apr-20
    -- [**1] use real account_id.
*/

import React from 'react';
import axios from 'axios';

import './style.css';

import logo from '../../assets/icon/weblogo_white.png';

import accountAccess from '../avatar/accountAccess.js'; 

import { Link } from "react-router-dom";

class Navbar extends React.Component {

  state = {
    loading: true,
    profileData: { first_name: 'firstName', last_name: 'lastName' },
  }

  componentDidMount() {
    accountAccess().clearAccountId();    
    let accountId = accountAccess().getAccountId();
    const url = `https://tue-kan.herokuapp.com/account/${accountId}`;
    this.setState({ loading: true })
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          profileData: data.data[0]
        })
        //console.log('data');
        //console.log(data);
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  }

  render () {
    let loading = this.state.loading;
    let profileData = this.state.profileData;
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
            { !loading && <p className='coin-messege coin-amount'><b>{profileData.coin_amount}</b></p>}
            { loading && <p className='coin-messege coin-amount'><b>xxxx</b></p>}
            <p className='coin-messege coin-ex'><b>TC</b></p>
          </div>
        </Link>
      </nav>
    );
  }

}

export default Navbar;
