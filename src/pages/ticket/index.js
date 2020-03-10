/*
  .add this page in 15-Feb-20 [Boat]
    -- use similar main postin
    -- wait main post complete (click to watching detail, buy ticket)
    -- * but some diff
    -- main post link to buy, but this post link to watch your ticket
  .edit 10-Mar-20 [Boat]
    -- edit ticket manage page like mainfeed
    -- wait complete data (img, joined, full, tutor, location)
    -- wait to route

    -- basic route
*/

import React from 'react';

import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import './style.css';

import {listData} from '../../components/MyTuelist/listData.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';
import MyTueList from '../../components/MyTuelist/index.js';
import Postlist from '../../components/SubContainer/Postlist/index.js';

const TicketDetail =(props)=> {
  let { ticketId } = useParams();
  let ticketData = listData[ticketId];
  console.log(ticketData);
  return (
    <>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
      <h1>Love {ticketId}</h1>
    </>
  );
}

const CreateItem =(props)=> {
  return (
    <div className={`ticket-item-${props.id} ticket-item`}>
      <h1>{props.topic}</h1>
    </div>
  );
}

const TicketList =()=> {
  return (
    <Postlist postData={listData} linkType='ticket' />
  );
}

class Ticket extends React.Component {

  render () {
    return (
      <MainDiv className='ticket-main-container'>
        <SubDiv className='ticket-sub-container'>
          <div className='post-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Ticket Management</b></p>
          </div>

          <Switch>

            {/*
              if don't go to sub-cate, it show category.
              if go to sub-cate, it link to this sub-cate with nested route.
            */}

            <Route exact path={'/ticket'} component={TicketList} />
            <Route exact path={`/ticket/:ticketId`} component={TicketDetail} />

          </Switch>

      </SubDiv>

      <MyTueList />

    </MainDiv>
    );
  }

}

export default Ticket;
