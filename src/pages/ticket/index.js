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
  .edit 11-Mar-20 [Boat]
    -- add div in ticket using style like <newCreatePost> (use styled)
  .edit 12-Mar-20 [Boat]
    -- add ticket description (img, location, date, time, price, join)
*/

import React from 'react';

import {
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import './style.css';

import tempPic from '../../components/avatar/profile.jpg';


import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

import DetailContainer from '../newCreatePost/detailContainer.js';
import DetailBody from '../newCreatePost/detailBody.js';
import DetailHeader from '../newCreatePost/detailHeader.js';

import {listData} from '../../components/MyTuelist/listData.js';


import MyTueList from '../../components/MyTuelist/index.js';
import Postlist from '../../components/SubContainer/Postlist/index.js';

const TicketDetail =(props)=> {
  let { ticketId } = useParams();
  let ticketData = listData[ticketId-1];
  //console.log(ticketData);
  return (
    <DetailContainer className='ticket-detail'>
      <DetailHeader className='detail-header' background='rgb(255,216,212)'>
        <p className='detail-header-text'><b>{ticketData.topic}</b></p>
      </DetailHeader>
      <DetailBody className='detail-body' background='rgb(255,238,238)'>
        <div className='body-container'>

          <div className='img-container'>
            <div className='img-box'>
              {/*<img className='tutor-img' src={ticketData.img} alt='tutor-img' />*/}
              {<img className='tutor-img' src={tempPic} alt='tutor-img' />}
            </div>
          </div>

          <div className='ticket-description-box'>

            {/*
              don't use array.map() because too complex.
            */}

            <div className='description-box location-box'>
              <i className="description-img fas fa-map-marker-alt"></i>
              <p className='description-text'>{`Location: ${ticketData.location}`}</p>
            </div>

            <div className='description-box date-box'>
              <i className="description-img fas fa-calendar-alt"></i>
              <p className='description-text'>{`Date: ${ticketData.date}`}</p>
            </div>

            <div className='description-box time-box'>
              <i className="description-img fas fa-clock"></i>
              <p className='description-text'>{`Time: ${ticketData.startTime}  -  ${ticketData.stopTime}`}</p>
            </div>

            <div className='description-box price-box'>
              <i className="description-img fas fa-coins"></i>
              <p className='description-text'>{`Price: ${ticketData.price} TC`}</p>
            </div>

            <div className='description-box ticket-box'>
              <i className="description-img fas fa-ticket-alt"></i>
              <p className='description-text'>{`Your Code: ${ticketData.ticket}`}</p>
            </div>

          </div>

          <div className='ticket-joined-box'>
            <div className='joined-box'>
              <p className='joined-number'><b>{`${ticketData.amount} / ${ticketData.full}`}</b></p>
            </div>
          </div>

          <div className='description-box ticket-box description-detail-box'>
            <i className="description-img fas fa-book" style={{margin: '5px 0 0 40px'}}></i>
            <p className='description-text'>Description</p>
            <div className='description-detail-text-box'>
              {
                ticketData.description !== '' ?

                <p className='description-detail-text'>{`${ticketData.description}`}</p>
                :
                <p className='description-detail-text'>This tue has not description.</p>
              }
            </div>
          </div>

        </div>
      </DetailBody>
  </DetailContainer>
  );
}

const TicketList =()=> {
  return (
    <Postlist postData={listData} linkTo='/ticket' />
  );
}

class Ticket extends React.Component {

  render () {
    return (
      <MainDiv className='ticket-main-container'>
        <SubDiv className='ticket-sub-container'>
          <div className='post-header ticket-detail-header' onClick={()=>window.history.back()}>
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
