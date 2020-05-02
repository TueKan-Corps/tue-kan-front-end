/*
  .edit 11-Apr-20 
    -- wait to POST.
  .edit 12-Apr-20
    -- edit to can POST to update coin.
  .edit 16-Apr-20
    -- edit to use redux.
*/

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './style.css';

import MyTueList from '../../components/MyTuelist/index.js'; 
import { notifyAlert } from '../../components/confirmAlert.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';
import DetailBody from '../newCreatePost/detailBody.js';

import accountAccess from '../../components/avatar/accountAccess.js'; 
 
import { coinOps } from '../../redux/actions/navBarAction.js';

let coinCode = {
  'SDHK': 50, 
  'PNGRJTKM': 100, 
  'BENTEN': 250, 
  'ANGCANOCHA': 500, 
  'SDSOHKSU': 5000,
  'DEL': -10000
};

const CoinPayment = ({ navState, dispatch })=> { 

  const profileData = navState.profileData

  const redeemCoinHandler =()=> {
    /// get value in input.
    let code = document.getElementById('coin-redeem-input').value;
    let accountId = accountAccess().getAccountId(); 
    let remainingCoin = parseInt(profileData.coin_amount); 

    if (code !== '') {

      if (typeof(coinCode[code]) !== 'undefined') {

        let url = `https://tue-kan.herokuapp.com/account/coin`;
        let data = { 
          'id': parseInt(accountId), 
          'coin': coinCode[code]
        }; 

        axios.post(url, data)
          .then((res) => {
            console.log(res.data)
          }).catch((error) => {
            console.log(error)
          });

        notifyAlert(() => { }, 'สำเร็จ!', `ท่านได้เติมเงิน ${coinCode[code]} coin เข้าสู่ระบบแล้ว`, 'success'); 

        /// edit coin_amount in profileData on navState.
        dispatch(coinOps(coinCode[code], true));
      }

      else {
        notifyAlert(() => { }, 'ล้มเหลว!', 'ข้อมูลโค้ดไม่ถูกต้อง', 'error');
      }

    } 
    else {
      notifyAlert(() => { }, 'ล้มเหลว!', 'ข้อมูลโค้ดไม่ถูกต้อง', 'error');
    } 
  }
    
    return (
      <MainDiv className='coin-main-container'>
        <SubDiv className='coin-sub-container'>
          <div className='post-header coin-detail-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Coin Payment</b></p>
          </div>

          <DetailBody className='detail-body'>
            <div className='redeem-description-box'>
              <div className='description-box redeem-box'>
                <i className="description-img fas fa-donate"></i>
                <p className='description-text'>Redeem Tue Coin :</p>
                <div className='description-box redeem-box'>

                  <div className='redeem-container'>
                    <input className='redeem-input' id='coin-redeem-input' type='text' placeholder='Enter code here ...'></input>

                    <div className='redeem-button-box'>
                      <div className='redeem-button-small-box'>
                        {/*
                          - redeem code.
                        */}
                        <p className='redeem-button redeem-ok' onClick={redeemCoinHandler}><b>OK</b></p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </DetailBody>

      </SubDiv>

      <MyTueList />

    </MainDiv>
  );
} 

const mapStateToProps = function (state) {
  return {
    navState: state.navBar
  }
}

const AppWithConnect = connect(mapStateToProps)(CoinPayment)
export default AppWithConnect
