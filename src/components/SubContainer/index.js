/*
  .edit 20-Mar-20 [Boat]
    -- test with backend mockup.
    -- add skeleleton loading component.
  .edit 07-Apr-20 [Boat]
    -- edit to use same component with ticket, posting.
  .edit 16-Apr-20 [Boat]
    -- edit to use redux.
*/

import React,{useEffect,useState} from 'react'
import { useDispatch, connect } from 'react-redux'; 

import Banner from './Banner/index'

import DetailBody from '../../pages/newCreatePost/detailBody'
import DetailContainer from '../../pages/newCreatePost/detailContainer'
import DetailHeader from '../../pages/newCreatePost/detailHeader'
import MainDiv from '../../pages/mainDiv'
import SubDiv from '../../pages/subDiv'

import Postlist from './Postlist/index' 
import { checkButtonStatus } from '../../helpers'
import accountAccess from '../avatar/accountAccess.js';
import LoadingPostList from '../../components/loadingPostList/index.js';
import MyTueList from '../../components/MyTuelist/index.js';

import { coinOps } from '../../redux/actions/navBarAction.js'; 
  
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

const Sub = (props) => {
  let { postId } = useParams();
  let dispatch = useDispatch();
  let mainData = props.mainListData[postId - 1];
  let postData = props.mainListData[postId - 1];
  let myTicketData = props.myTicketData;
  let profileData = props.profileData; 

  //console.log('profileData');
  //console.log(profileData);

  const [buttonState,setbuttonState] = useState({
    joinState: true,
    statusText: '',
    colorButton: '' 
  });
     
  let accountId = accountAccess().getAccountId()
  let imgSrc = `https://tue-kan.herokuapp.com/account/${mainData.account_id}/img`; 
  let data = {
    account_id: parseInt(accountId),
    post_id: parseInt(postData.id)
  }
  
  var today = new Date();
  var expDate = postData.date.split('-');

  useEffect(() => {
    let haveTicket = myTicketData?.find(ticket => ticket.id === postData.id); 
    //console.log('store.getState().navBar.profileData');
    //console.log(store.getState().navBar.profileData);
    setbuttonState(checkButtonStatus(expDate, today, postData, accountId, haveTicket, profileData));
    //console.log(checkButtonStatus(expDate, today, postData, accountId, haveTicket, reduxProfileData));
  }, [myTicketData]) 
 
  const buyTicket = () => {
    let url = `https://tue-kan.herokuapp.com/ticket/`; 
    axios.post(url, data)
      .then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      });
    PayCoin();
    alert('ซื้อสำเร็จ')
  }
  const PayCoin = () => {
    let newData = {'id': parseInt(accountId), 'coin': parseInt(profileData.coin_amount) - parseInt(mainData.price)}
    //console.log('props.profileData');
    //console.log(newData);

    let url = 'https://tue-kan.herokuapp.com/account/coin';
    axios.post(url, newData)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
    console.log(`${buttonState.joinState}`)
    alert('จ่ายเงิน');
    dispatch(coinOps(parseInt(mainData.price), false));
    
  } 
    return (

      <DetailContainer className='postlist-detail'>
        <DetailHeader className='detail-header' background='rgb(255,216,212)'>
          <p className='detail-header-text'><b>{mainData.topic}</b></p>
        </DetailHeader>
        <DetailBody className='detail-body' background='rgb(255,238,238)'>
          <div className='body-container'>
            <div className='img-container'>
              <div className='img-box'>
                <img className='tutor-img' src={imgSrc} alt='tutor-img' />
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
              <i className="description-img fas fa-book" style={{ margin: '5px 0 0 35px' }}></i>
              <p className='description-text'>Description</p>
              <div className='description-detail-text-box'>
                {
                  mainData.description !== '' ?
                    <p className='description-detail-text'>{`${mainData.description}`}</p>
                    :
                    <p className='description-detail-text'>This tue has not description.</p>
                }
              </div>
              <button className="buy-button" type="button" data-hover={buttonState.statusText} onClick={buyTicket} disabled={!buttonState.joinState} style={{ backgroundColor: `${buttonState.colorButton}` }} ><span>{`${postData.price} TC`}</span></button>

            </div>

            <div >

            </div>

          </div>
        </DetailBody>
      </DetailContainer>
    );
}
class SubContainer extends React.Component {

    state = {
      loading: true,
      mainListData: {}, 
    }

    componentDidMount() { 
      let url = 'https://tue-kan.herokuapp.com/post/'; 
      axios.get(url)
        .then(data => {
          this.setState({
            loading: false,
            mainListData: data.data
          })
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

      let accountId = accountAccess().getAccountId();
      
      url = `https://tue-kan.herokuapp.com/ticket/${accountId}`; 
      axios.get(url)
        .then(data => {
          this.setState({
            myTicketData : data.data
          })
        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?")) 
    }

    render() {
      let mainListData = this.state.mainListData;
      //let profileData = this.state.profileData; 
      let profileData = this.props.navState.profileData; 
      let myTicketData = this.state.myTicketData 
 
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
              {!this.state.loading && <Route exact path={`/home/:postId`} component={() => <Sub mainListData={mainListData} profileData={profileData} myTicketData={myTicketData}/>} />}

            </Switch>

          </SubDiv>

          <MyTueList />

        </MainDiv>
      );
    }
  }
  
const AppWithConnect = connect((state) => ({ navState: state.navBar }))(SubContainer)
export default AppWithConnect