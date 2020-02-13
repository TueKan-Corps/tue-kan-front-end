import React from 'react';

import './style.css';

import {profileData} from './profileData.js';

import { Link } from "react-router-dom";

class Avatar extends React.Component {

  render () {

    /*
      if length of firstname or lastname is greater than {maxLength} ->
      firstname will substring() from 0 to {dotLen} and concat with '...'
      else none
    */

    let maxLength = 13;
    let dotLen = maxLength - 2;
    let firstNameOverLen = (profileData.firstName).length > maxLength;
    let lastNameOverLen = (profileData.lastName).length > maxLength;
    let firstNameDisplay = firstNameOverLen ? `${(profileData.firstName).substring(0, dotLen)}...` : profileData.firstName;
    let lastNameDisplay = lastNameOverLen ? `${(profileData.lastName).substring(0, dotLen)}...` : profileData.lastName;
    let max = (profileData.firstName).length > (profileData.lastName).length ? (profileData.firstName).length : (profileData.lastName).length
    max = max <= maxLength ? max : maxLength;
    //console.log(firstNameOverLen);
    //console.log(lastNameOverLen);
    //console.log(profileData.firstName);
    return (
      <Link className='avatar-link' to='/profile'>
        {/* hover background of avatar is relate with length of firstname or lastname */}
        <div className='avatar-box' style={{width: `${max * (40 - (max+(max/1.5)))}px`}}>
            <div className='img-box'>
              <img className='avatar-img' src={profileData.img} alt='avatar-img' />
            </div>
            <div className='text-box'>
              <p className='firstname-text avatar-text'><b>{firstNameDisplay}</b></p>
              <p className='lastname-text avatar-text'><b>{lastNameDisplay}</b></p>
            </div>
        </div>
      </Link>
    );
  }

}

export default Avatar;
