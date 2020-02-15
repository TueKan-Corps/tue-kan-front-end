import React from 'react';

import './style.css';

import Avatar from '../avatar/index.js';
import SideMenu from '../sideMenu/index.js';
import PostButton from '../postButton/index.js';

class SideBar extends React.Component {

  render () {
    return (
      <div className='side-bar-container'>
        <Avatar />
        <SideMenu />
        <PostButton />
      </div>
    );
  }

}

export default SideBar;
