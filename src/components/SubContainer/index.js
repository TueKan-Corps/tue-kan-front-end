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

import Postlist from './Postlist/index.js';
import LoadingPostList from '../../components/loadingPostList/index.js';
import {checkButtonStatus} from '../../helpers'
import accountAccess from '../avatar/accountAccess.js';
//import { AlertConfirm } from '../../helpers/AlertConfirm';
import { confirmAlert } from '../confirmAlert.js';

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
 
  const [buttonState,setbuttonState] = useState({
    joinState: true,
    statusText: '',
    colorButton: '' 
  });
     
  let accountId = accountAccess().getAccountId()
  let imgSrc = `https://tue-kan.herokuapp.com/account/img/${mainData.account_id}`; 
  let data = {
    account_id: parseInt(accountId),
    post_id: parseInt(postData.id)
  }
  
  var today = new Date();
  var expDate = postData.date.split('-');
 
  useEffect(() => {
    let haveTicket = myTicketData?.find(ticket => ticket.id === postData.id);  
    setbuttonState(checkButtonStatus(expDate, today, postData, accountId, haveTicket, profileData)); 
    // eslint-disable-next-line
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
    AddOwnerCoin();
  }
    
  const PayCoin = () => {
    /// Decrementing coin of ticket buyer.
    let updateBuyer = {
      'id': parseInt(accountId), 
      'coin': parseInt(mainData.price) * -1
    };

    let url = 'https://tue-kan.herokuapp.com/account/coin';
    axios.post(url, updateBuyer)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      }); 
    dispatch(coinOps(parseInt(mainData.price), false)); 
  } 

  const AddOwnerCoin =()=> {
    /// Incrementing coin of ticket owner.
    let updateOwner = {
      'id': parseInt(mainData.account_id),
      'coin': parseInt(mainData.price)
    };

    let url = 'https://tue-kan.herokuapp.com/account/coin';
    axios.post(url, updateOwner)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      }); 
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
  
            </div>

            <div className='postlist-joined-box'>
              <div className='joined-box'>
                <p className='joined-number'><b>{`${mainData.amount} / ${mainData.full}`}</b></p>
              </div>
            </div>

            <div className='description-box postlist-box description-detail-box'>
              <i className="description-img fas fa-book" style={{ margin: '5px 0 0 35px' }}></i>
              <p className='description-text'>Description</p>

              {
                mainData.description === '' ?
                <textarea className='description-detail-text-box' value='This tue has not any descriptons.' style={{minHeight: '80px'}} readOnly spellCheck={false} />
                :
                <textarea className='description-detail-text-box' value={`${mainData.description}`} readOnly spellCheck={false} /> 
              }

              <button className="buy-button" type="button" data-hover={buttonState.statusText} onClick={() => confirmAlert(buyTicket, 'ท่านต้องการซื้อตั๋วใช่หรือไม่ ?', true, 'ท่านได้ซื้อตั๋วแล้ว', 'ยกเลิกการซื้อตั๋วแล้ว') } disabled={!buttonState.joinState} style={{ backgroundColor: `${buttonState.colorButton}` }} ><span>{`${postData.price} TC`}</span></button>

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