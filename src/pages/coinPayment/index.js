/*
  .edit 11-Apr-20 
    -- wait to POST.
  .edit 12-Apr-20
    -- edit to can POST to update coin.
*/

import React from 'react';
import axios from 'axios';

import './style.css';

import MyTueList from '../../components/MyTuelist/index.js'; 

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

import accountAccess from '../../components/avatar/accountAccess.js'; 

let coinCode = {
  'SDHK': 50, 
  'PNGRJTKM': 100, 
  'BENTEN': 250, 
  'ANGCANOCHA': 500, 
  'SDSOHKSU': 5000
};

class CoinPayment extends React.Component { 

  state = {
    profileData: {},
  }

  redeemCoinHandler =()=> {
    /// get value in input.
    let code = document.getElementById('coin-redeem-input').value;
    let accountId = accountAccess().getAccountId(); 
    let remainingCoin = parseInt(this.state.profileData.coin_amount);

    if (code !== '') {

      if (typeof(coinCode[code]) !== 'undefined') {

        let url = `https://tue-kan.herokuapp.com/account/coin`;
        let data = { 'id': parseInt(accountId), 'coin': coinCode[code] + remainingCoin };
        //console.log(data);

        axios.post(url, data)
          .then((res) => {
            console.log(res.data)
          }).catch((error) => {
            console.log(error)
          });

        alert('เติมเงินสำเร็จ !'); 
      }

      else {
        alert('โค้ดไม่ถูกต้อง !');
      }

    } 
    else {
      alert('โค้ดไม่ถูกต้อง !');
    }
  
    //window.location.reload();

  }

  componentDidMount() {
    let accountId = accountAccess().getAccountId();
    let url = `https://tue-kan.herokuapp.com/account/${accountId}`;
    /// get account data
    axios.get(url)
      .then(data => {
        this.setState({ 
          profileData: data.data[0]
        }) 
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  }

  render () {
    //console.log('coinCode');
    //console.log(coinCode['SDHK']);
    return (
      <MainDiv className='coin-main-container'>
        <SubDiv className='coin-sub-container'>
          <div className='post-header coin-detail-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Coin Payment</b></p>
          </div>

          <div className='detail-body'>
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
                        <p className='redeem-button redeem-ok' onClick={this.redeemCoinHandler}><b>OK</b></p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

      </SubDiv>

      <MyTueList />

    </MainDiv>
    );
  }

}

export default CoinPayment;
