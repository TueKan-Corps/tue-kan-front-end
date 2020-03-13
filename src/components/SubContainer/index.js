import React from 'react'
import Banner from './Banner/index'
import Postlist from './Postlist/index'
import TicketDetail from '../../'
import DetailBody from '../../pages/newCreatePost/detailBody'
import DetailContainer from '../../pages/newCreatePost/detailContainer'
import DetailHeader from '../../pages/newCreatePost/detailHeader'
import { storeProduct } from '../../data'
import { listData } from '../MyTuelist/listData.js';
import tempPic from '../avatar/profile.jpg';
import './style.css'

import {
  Switch,
  Route,
  useParams,
} from "react-router-dom";

const Main =()=> {
  return (
    <>
      <Banner />
      <Postlist postData={storeProduct} linkTo='/home' />
    </>
  );
}

const Sub =(props)=> {
  let { postId } = useParams();
  let postData = listData[postId-1];
  return (
    <DetailContainer className='ticket-detail'>
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

          <div className='description-box ticket-box'>
            <i className="description-img fas fa-ticket-alt"></i>
            <p className='description-text'>{`Your Code: ${postData.ticket}`}</p>
          </div>

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
        </div>

      </div>
    </DetailBody>
</DetailContainer>
  );
}

export default function SubContainer() {
    return (
        <div className="sub-container">

          <Switch>

            {/*
              if don't go to sub-cate, it show category.
              if go to sub-cate, it link to this sub-cate with nested route.
            */}

            <Route exact path={'/'} component={Main} />
            <Route exact path={`/home/:postId`} component={Sub} />

          </Switch>


        </div>
    )
}
