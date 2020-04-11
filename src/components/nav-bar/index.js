/*
  .edit 15-Mar-20
    -- edit coin data to use data from <profileData.js> in <avatar> folder.
  .edit 02-Apr-20 
    -- [**1] fake account_id.
  .edit 07-Apr-20
    -- edit to use real data from real database.
  .edit 10-Apr-20
    -- [**1] use real account_id.
  .edit 11-Apr-20
    -- add login, logout button in <Navbar>.
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
    status: 'guest'
  }

  logout() {
    accountAccess().clearAccountId();
    window.location = '/';
  }

  componentDidMount() {
    //accountAccess().clearAccountId();    
    //accountAccess().setAccountId(29);
    let accountId = accountAccess().getAccountId();

    console.log(accountId);

    if (accountId !== 36) {
      this.setState({ status: 'user' })
    }

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
    let status = this.state.status;
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
 
        <div className='login-box'>
        {
          status === 'guest' ?
          <Link to='/login'className='login-text'>
            <b>LOGIN</b>
          </Link>
          :
          <p className='login-text' onClick={this.logout}><b>LOGOUT</b></p>
        }
        </div> 
      </nav>
    );
  }

}

export default Navbar;
