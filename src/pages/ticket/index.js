/*
  .add this page in 15-Feb-20
    -- use similar main postin
    -- wait main post complete (click to watching detail, buy ticket)
    -- * but some diff
    -- main post link to buy, but this post link to watch your ticket
*/

import React from 'react';

import './style.css';

import {listData} from '../../components/MyTuelist/listData.js';

import styled from 'styled-components';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';
import MyTueList from '../../components/MyTuelist/index.js';

const CreateItem =(props)=> {
  return (
    <div className={`ticket-item-${props.id} ticket-item`}>
      <h1>{props.topic}</h1>
    </div>
  );
}

class Ticket extends React.Component {

  render () {
    return (
      <MainDiv className='ticket-main-container'>
        <SubDiv className='ticket-sub-container'>
          <div className='post-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Ticket Manage</b></p>
          </div>

          <div className='ticket-detail'>
          {
            listData.map(item => (
              <CreateItem key={item.id} {...item} />
            ))
          }
          </div>
        </SubDiv>

        <MyTueList />

      </MainDiv>
    );
  }

}

export default Ticket;
