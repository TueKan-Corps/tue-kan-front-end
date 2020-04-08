/*
  .add in 20-Mar-20
    -- for loading postlist, ticketlist, mainlist.
*/

import React from 'react'

import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
//import { Spinner } from 'react-bootstrap';

//import { Link } from 'react-router-dom';

const LoadingPost =()=> {

  return (
    <div className="post">
      <div className="new-detail">
        <div className='spinner-box'>
          <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  );

}

export default function LoadingPostList(props) {
    let forCreate = Array.from({length: props.length});
    return (
      <>
      {
        forCreate.map((item, iteration) => (
          <LoadingPost key={iteration} />
        ))
      }
      </>
    )
}
