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
  .edit 16-Apr-20
    -- edit to use redux.
  .edit 17-Apr-20
    -- add sweetalert2.
*/

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import './style.css';

import logo from '../../assets/icon/weblogo_blue.png';

import { notifyAlert } from '../confirmAlert.js';

import accountAccess from '../avatar/accountAccess.js'; 

import { setProfile, setLoading, setStatus } from '../../redux/actions/navBarAction.js';
 
const Navbar = ({ navState, dispatch})=> {
  
  const logout =()=> {
    accountAccess().clearAccountId();
    notifyAlert(() => window.location = '/', 'สำเร็จ!', 'ท่านได้ออกจากระบบแล้ว', 'success'); 
  }

  React.useEffect (() => {  

    let accountId = accountAccess().getAccountId();

    const url = `https://tue-kan.herokuapp.com/account/${accountId}`; 
    axios.get(url)
      .then(data => {
        dispatch(setProfile(data.data[0]));
        dispatch(setLoading(false));  
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  
    if (accountId !== 36) {
      dispatch(setStatus('user'));
    } 
    // eslint-disable-next-line
  }, []);
 
  let loading = navState.loading;
  let profileData = navState.profileData;
  let status = navState.status;

  //console.log(profileData);
  
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
        <p className='login-text' onClick={logout}><b>LOGOUT</b></p> 
      }
      </div> 
    </nav>
  ); 

}

const mapStateToProps =(state)=> ({
    navState: state.navBar
})

const AppWithConnect = connect(mapStateToProps)(Navbar)
export default AppWithConnect
