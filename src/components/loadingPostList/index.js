/*
  .add in 20-Mar-20
    -- for loading postlist, ticketlist, mainlist.
*/

import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const LoadingPost =()=> {

  return (
    <div className="post">
      <div className="detail">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );

}

export default function LoadingPostList(props) {
    let forCreate = Array.from({length: 5});
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
