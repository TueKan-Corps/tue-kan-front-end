import React from 'react';

import './style.css';

import {profileData} from './profileData.js';

import { Link } from "react-router-dom";

class Avatar extends React.Component {

  render () {
    let maxLength = 15;
    let firstNameOverLen = (profileData.firstName).length > maxLength;
    let lastNameOverLen = (profileData.lastName).length > maxLength;
    let firstNameDisplay = firstNameOverLen ? `${(profileData.firstName).substring(0, 13)}...` : profileData.firstName;
    let lastNameDisplay = lastNameOverLen ? `${(profileData.lastName).substring(0, 13)}...` : profileData.lastName;
    //console.log(firstNameOverLen);
    //console.log(lastNameOverLen);
    //console.log(profileData.firstName);
    return (
      <Link className='avatar-link' to='/profile'>
        <div className='avatar-box'>
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
