/*
  .edit 20-Mar-20 [Boat]
    -- test with backend mockup.
    -- add skeleleton loading component.
  .edit 07-Apr-20 [Boat]
    -- edit to use same component with ticket, posting.
*/

import React from 'react'
import Banner from './Banner/index'

import Postlist from './Postlist/index' 
import DetailBody from '../../pages/newCreatePost/detailBody'
import DetailContainer from '../../pages/newCreatePost/detailContainer'
import DetailHeader from '../../pages/newCreatePost/detailHeader'
import MainDiv from '../../pages/mainDiv'
import SubDiv from '../../pages/subDiv'
import LoadingPostList from '../../components/loadingPostList/index.js'; 
import MyTueList from '../../components/MyTuelist/index.js';
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

const payCoin = (props) => {

}


const Sub =(props)=> {
  let { postId } = useParams();
  let mainData = props.mainListData[postId-1];
  return (

    <DetailContainer className='postlist-detail'> 
      <DetailHeader className='detail-header' background='rgb(255,216,212)'>
      <p className='detail-header-text'><b>{mainData.topic}</b></p>
      </DetailHeader>
      <DetailBody className='detail-body' background='rgb(255,238,238)'>
      <div className='body-container'>
        <div className='img-container'>
          <div className='img-box'>
            {/*<img className='tutor-img' src={ticketData.img} alt='tutor-img' />*/}
            {<img className='tutor-img' src={tempPic} alt='tutor-img' />}
          </div>
        </div>

          <div className='postlist-description-box'>

          {/*
            don't use array.map() because too complex.
          */}

          <div className='description-box location-box'>
            <i className="description-img fas fa-map-marker-alt"></i>
            <p className='description-text'>{`Location: ${mainData.location}`}</p>
          </div>

          <div className='description-box date-box'>
            <i className="description-img fas fa-calendar-alt"></i>
            <p className='description-text'>{`Date: ${mainData.date}`}</p>
          </div>

          <div className='description-box time-box'>
            <i className="description-img fas fa-clock"></i>
            <p className='description-text'>{`Time: ${mainData.start_time}  -  ${mainData.stop_time}`}</p>
          </div>

          <div className='description-box price-box'>
            <i className="description-img fas fa-coins"></i>
            <p className='description-text'>{`Price: ${mainData.price} TC`}</p>
          </div>

            {/* <div className='description-box postlist-box'>
            <i className="description-img fas fa-ticket-alt"></i>
            <p className='description-text'>{`Your Code: ${mainData.ticket}`}</p>
          </div> */}

        </div>

          <div className='postlist-joined-box'>
          <div className='joined-box'>
            <p className='joined-number'><b>{`${mainData.amount} / ${mainData.full}`}</b></p>
          </div>
        </div>

          <div className='description-box postlist-box description-detail-box'>
          <i className="description-img fas fa-book" style={{margin: '5px 0 0 35px'}}></i>
          <p className='description-text'>Description</p>
          <div className='description-detail-text-box'>
            {
              mainData.description !== '' ?
              <p className='description-detail-text'>{`${mainData.description}`}</p>
              :
              <p className='description-detail-text'>This tue has not description.</p>
            }
            </div>
              <button className="buy-button"  type="button" data-hover="BuyTicket Now!!" data-active="You bought tricket"><span>{`${mainData.price} TC`}</span></button>

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
    mainListData: {}
  }

  componentDidMount () {
    //const url ='https://mock-up-tuekan-backend.herokuapp.com/post/posting';
    const url ='https://tue-kan.herokuapp.com/post/';
    this.setState({loading: true})
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          mainListData: data.data
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  }

  render () {
    let mainListData = this.state.mainListData;
    return (
      <MainDiv className='postlist-main-container'>
        <SubDiv className='postlist-sub-container'>

          <Switch>

            {/*
              if don't go to sub-cate, it show category.
              if go to sub-cate, it link to this sub-cate with nested route.
            */}

            {
              this.state.loading &&
              <LoadingPostList length={4} />
            }
            {!this.state.loading && <Route exact path={'/'} component={() => <Main mainListData={mainListData} />} />}
            {!this.state.loading && <Route exact path={`/home/:postId`} component={() => <Sub mainListData={mainListData} />} />}

          </Switch>

        </SubDiv>

        <MyTueList />

      </MainDiv>
    );
  }
}
