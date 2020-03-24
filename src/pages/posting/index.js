/*
  .add 13-Mar-20
    -- reuse component <MainDiv>, <SubDiv>, components from ticket.
    -- have not {myPostingData}, using data form {listData}.
  .edit 16-Mar-20
    -- add participant table.
    -- add redeem ticket, can verify id by ticketCode.
    -- ** remaining [POST] to DB.
*/

import React from 'react';

import {
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import axios from 'axios';

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
import LoadingPostList from '../../components/loadingPostList/index.js';
import NameListTable from './nameListTable/index.js';

const findTicket =(length)=> {
  /// get ticket code from redeem box.
  let ticket = document.getElementById('redeem-box').value;
  /// get all ticket of this tue.
  let item = document.getElementsByClassName('ticket-for-redeem');

  /// if ticket is not empty, it can continue.
  let i = ticket !== '' ? 0 : length;
  let canFind = false;
  for (i ; i < length; i++) {
    /// check value of ticket from input and ticket of tue list data.
    canFind = item[i].innerText === ticket ? true : false;
    if (canFind)
      break;
  }
  /// return canFind(boolean), i(id of row in table).
  return {canFind, i};
}

const scrollTable =(length)=> {
  if(findTicket(length).canFind) {
    /// get highlight row.
    let name = 'name-list-row-' + (findTicket(length).i + 1);
    let myElement = document.getElementById(name);
    /// get current topPos.
    let topPos = myElement.offsetTop;
    /// auto scrolling.
    document.getElementById('name-list-table-id').scrollTop = topPos - 80;
  }
}

const PostingDetail =(props)=> {
  const [ticketId, setticketId] = React.useState(0);

  const checkAndHighLight =(length)=> {
    if(findTicket(length).canFind) {
      setticketId(document.getElementById('redeem-box').value);
      scrollTable(length);
    }
    else {
      setticketId('999999');
    }
  }

  let { postingId } = useParams();
  let postingData = props.postData[postingId-1];
  console.log(props.postData[postingId-1]);
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
            <i className="description-img fas fa-book" style={{margin: '5px 0 0 40px'}}></i>
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

              <div className='name-list-table-container' id='name-list-table-id'>

                {/*
                  - pass ticketId to set background color of this row.
                */}
                <NameListTable topic={postingData.topic} data={postingData.participant} ticketId={ticketId} />

              </div>

            </div>
          </div>

          <div className='redeem-description-box'>
            <div className='description-box redeem-box'>
              <i className="description-img fas fa-search"></i>
              <p className='description-text'>Redeem Ticket :</p>

              <div className='redeem-container'>
                <input className='redeem-input' id='redeem-box' type='text' placeholder='Enter ticket here ...'></input>

                <div className='redeem-button-box'>
                  <div className='redeem-button-small-box'>
                    {/*
                      - must check ticket input from <input id='redeem-box'> before redeem.
                      - if can find ticket on list, findTicket() return true.
                      - setIsHaveTicket with returned value.
                      - highlight row.
                    */}
                    <p className='redeem-button redeem-check' onClick={()=>checkAndHighLight(postingData.participant.length)}><b>Check</b></p>

                    {/*
                      - if isHaveTicket, setticketId by input <input id='redeem-box'>
                      - have alert to confirm.
                      - *** must have to update in DB.
                    */}
                    <p className='redeem-button redeem-ok'><b>OK</b></p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </DetailBody>
  </DetailContainer>
  );
}

const PostingList =(props)=> {
  return (
    <Postlist postData={props.postData} linkTo='/posting' />
  );
}

class Posting extends React.Component {

    state = {
      loading: true,
      postingData: {}
    }

    componentDidMount () {
      const url ='https://mock-up-tuekan-backend.herokuapp.com/post/posting';
      //const url ='https://mock-up-tuekan-backend.herokuapp.com/profile';
      this.setState({loading: true})
      axios.get(url)
        .then(data => {
          this.setState({
            loading: false,
            postingData: data.data
          })
          console.log('data');
          console.log(data);
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
      //console.log('loading complete!');
  }

  render () {
    // console.log(this.state.postingData);
    let postingData = this.state.postingData;
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

            {
              this.state.loading &&
              <LoadingPostList length={4} />
            }
            { !this.state.loading && <Route exact path={'/posting'} component={()=><PostingList postData={postingData} />} /> }
            { !this.state.loading && <Route exact path={`/posting/:postingId`} component={()=><PostingDetail postData={postingData} /> } />  }

          </Switch>

      </SubDiv>

      <MyTueList />

    </MainDiv>
    );
  }
}

export default Posting;
