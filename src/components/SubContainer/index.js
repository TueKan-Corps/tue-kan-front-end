/*
  .edit 20-Mar-20 [Boat]
    -- test with backend mockup.
    -- add skeleleton loading component.
*/

import React from 'react'
import Banner from './Banner/index'

import Postlist from './Postlist/index'
import TicketDetail from '../../'
import DetailBody from '../../pages/newCreatePost/detailBody'
import DetailContainer from '../../pages/newCreatePost/detailContainer'
import DetailHeader from '../../pages/newCreatePost/detailHeader'
import MainDiv from '../../pages/mainDiv'
import SubDiv from '../../pages/mainDiv'
import LoadingPostList from '../../components/loadingPostList/index.js';


import { storeProduct } from '../../data'
import { listData } from '../MyTuelist/listData.js';
import {accountData} from '../../components/avatar/accountData.js';


import tempPic from '../avatar/profile.jpg';
import './style.css'

import {
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import axios from 'axios';

const Main =(props)=> {
  return (
    <>
      <Banner />
      <Postlist postData={props.mainListData} linkTo='/home' />
    </>
  );
}

const Sub =(props)=> {
  let { postId } = useParams();
  let postData = props.mainListData[postId - 1];
  let accountId = accountData.account_id;
  let data = {
    account_id : accountId,
    post_id : parseInt(postData.id)
  }

  var today = new Date();
  var dayNowDate = String(today.getDate()).padStart(2, '0');
  var mountNowDate = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yearNowDate = today.getFullYear();
  var expDate = postData.date.split('-');
  var expDay = parseInt(expDate[1]);
  var expMount = parseInt(expDate[0]);
  var expYear = parseInt(expDate[2]);


  let buttonState = {
    joinState: true,
    statusText: '',
    colorButton : ''
  }
  if (postData.amount >= postData.full) {
    buttonState.joinState = false
    buttonState.statusText = 'Soldout'
    buttonState.colorButton = 'rgb(255,216,212)'
  }
  else {
    buttonState.joinState = true
    buttonState.statusText = 'Buy Ticket'
    buttonState.colorButton = '#ffeb99'
  }

  if (yearNowDate <= expYear) {
    if (mountNowDate < expMount) {
      buttonState.joinState = true
    }
    else if (mountNowDate == expMount) {
      if (dayNowDate < expDay) {
        buttonState.joinState = true
      }
      else {
        buttonState.joinState = false
        buttonState.colorButton = 'rgb(255,216,212)'
        buttonState.statusText = 'Out of date'
      }
    }
    else {
      buttonState.joinState = false
      buttonState.colorButton = 'rgb(255,216,212)'
      buttonState.statusText = 'Out of date'
    }
  }
  else if (yearNowDate < expYear) {
    buttonState.joinState = true
  }
  else {
    buttonState.joinState = false
    buttonState.colorButton = 'rgb(255,216,212)'
    buttonState.statusText = 'Out of date'
  }

  const buyTicket = () => {
    let url = `https://tue-kan.herokuapp.com/ticket/`;  
      axios.post(url, data)
        .then((res) => {
            console.log(res.data)
      }).catch((error) => {
            console.log(error)
      });
    payCoin();
    alert('ซื้อสำเร็จ')
  }
  const payCoin = () => {
    console.log(props.profileData);
    let newData = props.profileData;
    newData['coin_amount'] = newData.coin_amount - parseInt(postData.price);

    let url = 'https://mock-up-tuekan-backend.herokuapp.com/profile';  
      axios.post(url, newData)
        .then((res) => {
            console.log(res)
      }).catch((error) => {
            console.log(error)
      });
    alert('pay coin');
  }

  return (

    <DetailContainer className='ticket-detail'>
      <div className='post-header ticket-detail-header' onClick={()=>window.history.back()}>
        <i className="header-item header-back-icon fas fa-chevron-left"></i>
        <p className='header-item header-text'><b>Back</b></p>
      </div>
      <DetailHeader className='detail-header' background='rgb(255,216,212)'>
      <p className='detail-header-text'><b>{postData.topic}</b></p>
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
            <p className='description-text'>{`Location: ${postData.location}`}</p>
          </div>

          <div className='description-box date-box'>
            <i className="description-img fas fa-calendar-alt"></i>
            <p className='description-text'>{`Date: ${postData.date}`}</p>
          </div>

          <div className='description-box time-box'>
            <i className="description-img fas fa-clock"></i>
            <p className='description-text'>{`Time: ${postData.startTime}  -  ${postData.stopTime}`}</p>
          </div>

          <div className='description-box price-box'>
            <i className="description-img fas fa-coins"></i>
            <p className='description-text'>{`Price: ${postData.price} TC`}</p>
          </div>

          {/* <div className='description-box ticket-box'>
            <i className="description-img fas fa-ticket-alt"></i>
            <p className='description-text'>{`Your Code: ${postData.ticket}`}</p>
          </div> */}

        </div>

        <div className='ticket-joined-box'>
          <div className='joined-box'>
            <p className='joined-number'><b>{`${postData.amount} / ${postData.full}`}</b></p>
          </div>
        </div>

        <div className='description-box ticket-box description-detail-box'>
          <i className="description-img fas fa-book" style={{margin: '5px 0 0 35px'}}></i>
          <p className='description-text'>Description</p>
          <div className='description-detail-text-box'>
            {
              postData.description != '' ?
              <p className='description-detail-text'>{`${postData.description}`}</p>
              :
              <p className='description-detail-text'>This tue has not description.</p>
            }
            </div>
            <button className="buy-button" type="button" data-hover={buttonState.statusText} onClick={buyTicket} disabled={!buttonState.joinState} style={{backgroundColor : `${buttonState.colorButton}`}} ><span>{`${postData.price} TC`}</span></button>

        </div>

          <div >

          </div>

      </div>
      </DetailBody>
    </DetailContainer>
  );
}

export default class SubContainer extends React.Component {

  state = {
    loading: true,
    mainListData: {},
    profileData: {},
  }

  componentDidMount () {
    //const url ='https://mock-up-tuekan-backend.herokuapp.com/post/posting';
    let url ='https://tue-kan.herokuapp.com/post/';
    this.setState({loading: true})
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          mainListData: data.data
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    url ='https://mock-up-tuekan-backend.herokuapp.com/profile';
    axios.get(url)
      .then(data => {
        this.setState({
          profileData : data.data
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
      console.log('print something');
    //console.log('loading complete!');
  }

  render () {
    let mainListData = this.state.mainListData;
    let profileData = this.state.profileData;
    return (
      <div className="sub-container">
      <Switch>

        {/*
          if don't go to sub-cate, it show category.
          if go to sub-cate, it link to this sub-cate with nested route.
        */}
        {
          this.state.loading &&
          <LoadingPostList length={4} />
        }
        { !this.state.loading && <Route exact path={'/'} component={()=><Main mainListData={mainListData} />} />}
          {!this.state.loading && <Route exact path={`/home/:postId`} component={() => <Sub mainListData={mainListData} profileData={profileData}/>} />}

        </Switch>
        </div>
      )
  }
}
