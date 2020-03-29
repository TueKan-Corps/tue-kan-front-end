import React from 'react';

import './style.css';

import MyTueList from '../../components/MyTuelist/index.js';
import LoadingPostList from '../../components/loadingPostList/index.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

class CoinPayment extends React.Component {

  render () {
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
                    <input className='redeem-input' id='redeem-box' type='text' placeholder='Enter code here ...'></input>

                    <div className='redeem-button-box'>
                      <div className='redeem-button-small-box'>
                        {/*
                          - redeem code.
                        */}
                        <p className='redeem-button redeem-ok'><b>OK</b></p>
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
