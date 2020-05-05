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
  .edit 20-Mar-20 [Boat]
    -- test with backend mockup.
    -- add skeleleton loading component.
  .edit 02-Apr-20
    -- edit to use centralized account_id.
    -- [**1] fake account_id.
  .edit 10-Apr-20
    -- [**1] use real account_id.
  .edit 12-Apr-20
    -- edit to change post img to real img from backend.
*/

import React from 'react';

import {
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";
import axios from 'axios';

import './style.css';
 
import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

import DetailContainer from '../newCreatePost/detailContainer.js';
import DetailBody from '../newCreatePost/detailBody.js';
import DetailHeader from '../newCreatePost/detailHeader.js';

import MyTueList from '../../components/MyTuelist/index.js';
import Postlist from '../../components/SubContainer/Postlist/index.js';
import LoadingPostList from '../../components/loadingPostList/index.js';
import accountAccess from '../../components/avatar/accountAccess.js';

const TicketDetail =(props)=> {
  let { ticketId } = useParams();
  let ticketData = props.ticketData[ticketId-1];
  let imgSrc = `https://tue-kan.herokuapp.com/account/img/${ticketData.account_id}`;
  //console.log(ticketData);
  return (
    <DetailContainer className='ticket-detail'>
      <DetailHeader className='detail-header' background='rgb(254, 204, 199)'>
        <p className='detail-header-text'><b>{ticketData.topic}</b></p>
      </DetailHeader>
      <DetailBody className='detail-body'>
        <div className='body-container'>

          <div className='img-container'>
            <Link className='img-box' to={`/view-profile/${ticketData.account_id}`}>
              <img className='tutor-img' src={imgSrc} alt='tutor-img' />
            </Link>
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
              <p className='description-text'>{`Time: ${ticketData.start_time}  -  ${ticketData.stop_time}`}</p>
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
            {
              ticketData.description === '' ?
              <textarea className='description-detail-text-box' value='This tue has not any descriptons.' style={{ minHeight: '80px' }} readOnly spellCheck={false} />
              :
              <textarea className='description-detail-text-box' value={`${ticketData.description}`} readOnly spellCheck={false} />
            } 
          </div>

        </div>
      </DetailBody>
  </DetailContainer>
  );
}

const TicketList =(props)=> {
  return (
    <Postlist postData={props.ticketData} linkTo='/ticket' />
  );
}

class Ticket extends React.Component {

  state = {
    loading: true,
    ticketData: {}
  }

  componentDidMount () {
    //const url ='https://mock-up-tuekan-backend.herokuapp.com/post/posting';
    let accountId = accountAccess().getAccountId(); 
    const url = `https://tue-kan.herokuapp.com/ticket/${accountId}`;
    this.setState({loading: true})
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          ticketData: data.data
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  }

  render () {
    let ticketData = this.state.ticketData;
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
            {
              this.state.loading &&
              <LoadingPostList length={4} />
            }
            { !this.state.loading && <Route exact path={'/ticket'} component={()=><TicketList ticketData={ticketData} />} />}
            { !this.state.loading && <Route exact path={`/ticket/:ticketId`} component={()=><TicketDetail ticketData={ticketData} />} />}

          </Switch>

      </SubDiv>

      <MyTueList />

    </MainDiv>
    );
  }

}

export default Ticket;
