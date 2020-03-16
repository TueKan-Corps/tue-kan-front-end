/*
  .add 13-Mar-20
    -- reuse component <MainDiv>, <SubDiv>, components from ticket.
    -- have not {myPostingData}, using data form {listData}.
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

import {myPostingData} from '../../components/MyTuelist/myPostingData.js';

import MyTueList from '../../components/MyTuelist/index.js';
import Postlist from '../../components/SubContainer/Postlist/index.js';
import NameListTable from './nameListTable/index.js';

const findTicket =(length)=> {
  /// get ticket code from redeem box.
  let ticket = document.getElementById('redeem-box').value;
  /// get all ticket of this tue.
  let item = document.getElementsByClassName('ticket-for-redeem');

  //console.log('ticket ' + ticket);
  /// if ticket is not empty, it can continue.
  let i = ticket !== '' ? 0 : length;
  let canFind = false;
  for (i ; i < length; i++)
  {
    //console.log(item[i].innerText);
    /// check value of ticket from input and ticket of tue list data.
    canFind = item[i].innerText === ticket ? true : false;
    if (canFind)
      break;
  }
  return (canFind);
}

const PostingDetail =(props)=> {
  const [redeemThisTicket, setRedeemThisTicket] = React.useState(0);
  const [isHaveTicket, setIsHaveTicket] = React.useState(0);

  let { postingId } = useParams();
  let postingData = myPostingData[postingId-1];
  //console.log(isHaveTicket);
  return (
    <DetailContainer className='posting-detail'>
        <DetailHeader className='detail-header' background='rgb(180,245,188)'>
        <p className='detail-header-text'><b>{postingData.topic}</b></p>
      </DetailHeader>
      <DetailBody className='detail-body' background='rgb(233,255,236)'>
        <div className='body-container'>

          <div className='img-container'>
            <div className='img-box'>
              {/*<img className='tutor-img' src={ticketData.img} alt='tutor-img' />*/}
              {<img className='tutor-img' src={tempPic} alt='tutor-img' />}
            </div>
          </div>

          <div className='posting-description-box'>

            {/*
              don't use array.map() because too complex.
            */}

            <div className='description-box location-box'>
              <i className="description-img fas fa-map-marker-alt"></i>
              <p className='description-text'>{`Location: ${postingData.location}`}</p>
            </div>

            <div className='description-box date-box'>
              <i className="description-img fas fa-calendar-alt"></i>
              <p className='description-text'>{`Date: ${postingData.date}`}</p>
            </div>

            <div className='description-box time-box'>
              <i className="description-img fas fa-clock"></i>
              <p className='description-text'>{`Time: ${postingData.startTime}  -  ${postingData.stopTime}`}</p>
            </div>

            <div className='description-box price-box'>
              <i className="description-img fas fa-coins"></i>
              <p className='description-text'>{`Price: ${postingData.price} TC`}</p>
            </div>

          </div>

          <div className='posting-joined-box'>
            <div className='joined-box'>
              <p className='joined-number'><b>{`${postingData.amount} / ${postingData.full}`}</b></p>
            </div>
          </div>

          <div className='description-box posting-box description-detail-box'>
            <i className="description-img fas fa-book" style={{margin: '5px 0 0 35px'}}></i>
            <p className='description-text'>Description</p>
            <div className='description-detail-text-box'>
              {
                postingData.description !== '' ?
                <p className='description-detail-text'>{`${postingData.description}`}</p>
                :
                <p className='description-detail-text'>This tue has not description.</p>
              }
            </div>
          </div>

          <div className='name-list-description-box'>
            <div className='description-box participant-box'>
              <i className="description-img fas fa-users"></i>
              <p className='description-text'>Participant List :</p>

              <div className='name-list-table-container'>

                {/*
                  - pass redeemThisTicket to set background color of this row.
                */}
                <NameListTable topic={postingData.topic} data={postingData.participant} redeemThisTicket={redeemThisTicket} />

              </div>

            </div>
          </div>

          <div className='redeem-description-box'>
            <div className='description-box redeem-box'>
              <i className="description-img fas fa-search"></i>
              <p className='description-text'>Redeem Ticket :</p>

              <div className='redeem-container'>
                <input id='redeem-box' type='text' name='redeem-input'></input>

                {/*
                  - must check ticket input from <input id='redeem-box'> before redeem.
                  - if can find ticket on list, findTicket() return true.
                  - setIsHaveTicket with returned value.
                */}
                <p onClick={()=>setIsHaveTicket(findTicket(postingData.participant.length))}>Check</p>

                {/*
                  - if isHaveTicket, setRedeemThisTicket by input <input id='redeem-box'>
                  - have alert to confirm.
                  - must have to update in DB.
                */}
                <p onClick={()=>setRedeemThisTicket(document.getElementById('redeem-box').value) && isHaveTicket}>OK</p>

              </div>

            </div>
          </div>

        </div>
      </DetailBody>
  </DetailContainer>
  );
}

const PostingList =()=> {
  return (
    <Postlist postData={myPostingData} linkTo='/posting' />
  );
}

class Posting extends React.Component {

  render () {
    return (
      <MainDiv className='posting-main-container'>
        <SubDiv className='posting-sub-container'>
          <div className='post-header posting-detail-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Posting Management</b></p>
          </div>

          <Switch>

            {/*
              if don't go to sub-cate, it show category.
              if go to sub-cate, it link to this sub-cate with nested route.
            */}

            <Route exact path={'/posting'} component={PostingList} />
            <Route exact path={`/posting/:postingId`} component={PostingDetail} />

          </Switch>

      </SubDiv>

      <MyTueList />

    </MainDiv>
    );
  }
}

export default Posting;
