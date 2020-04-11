/*
  .edit 07-Apr-20
    -- edit to use real data from real database.
  .edit 09-Apr-20
    -- edit to use real profile img from real server. 
*/

import React from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
 
import accountAccess from './accountAccess.js';

import './style.css';
  
class Avatar extends React.Component {

  state = {
    loading: true, 
    profileData: { first_name: 'firstName', last_name: 'lastName' }, 
    img: {}
  }

  componentDidMount() {  
    let accountId = accountAccess().getAccountId(); 
    const url = `https://tue-kan.herokuapp.com/account/${accountId}`;
    
    /// get account data
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          profileData: data.data[0]
        })
        //console.log('data');
        //console.log(data);
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');

    /// get account img
    let imgSrc = `https://tue-kan.herokuapp.com/account/${accountId}/img`;
    this.setState({
      img: imgSrc
    })
  }

  render () {

    /*
      if length of firstname or lastname is greater than {maxLength} ->
      firstname will substring() from 0 to {dotLen} and concat with '...'
      else none
    */

    let loading = this.state.loading;
    let profileData = this.state.profileData;
    let maxLength = 13;
    let dotLen = maxLength - 2;
    let firstNameOverLen = (profileData.first_name).length > maxLength;
    let lastNameOverLen = (profileData.last_name).length > maxLength;
    let firstNameDisplay = firstNameOverLen ? `${(profileData.first_name).substring(0, dotLen)}...` : profileData.first_name;
    let lastNameDisplay = lastNameOverLen ? `${(profileData.last_name).substring(0, dotLen)}...` : profileData.last_name;
    let max = (profileData.first_name).length > (profileData.last_name).length ? (profileData.first_name).length : (profileData.last_name).length
    max = max <= maxLength ? max : maxLength;
    //console.log(firstNameOverLen);
    //console.log(lastNameOverLen);
    //console.log(profileData.firstName);
    return (
      <Link className='avatar-link' to='/profile'>
        {/* hover background of avatar is relate with length of firstname or lastname */}
        <div className='avatar-box' style={{width: `${max * (40 - (max+(max/1.5)))}px`}}>
            <div className='img-box'>
              <img className='avatar-img' src={this.state.img} alt='avatar-img' />
            </div>
            <div className='text-box'>
            {
              loading ?
              <>
                  <Spinner className='name-loading' animation="grow" variant="primary" /> 
              </>
              :
              <>
                <p className='firstname-text avatar-text'><b>{firstNameDisplay}</b></p>
                <p className='lastname-text avatar-text'><b>{lastNameDisplay}</b></p>
              </>
            }
            </div>
        </div>
      </Link>
    );
  }

}

export default Avatar;
