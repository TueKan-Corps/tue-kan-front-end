import React from 'react';

import './style.css';

import { Link } from "react-router-dom";

class PostButton extends React.Component {

  render () {
    return (
      <div className='post-button-box'>
        <Link className='post-messege' to='/post'><b>POST!</b></Link>
      </div>
    );
  }

}

export default PostButton;
