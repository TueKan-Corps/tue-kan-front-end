/*
  .edit 10-Mar-20 [Boat]
    -- edit to route (main, ticket)
*/

import React from 'react'
import './style.css'

import { Link } from 'react-router-dom';

let colorTag = ['skyblue', 'rgb(255,197,130)', 'pink', 'rgb(241,184,255)', 'lightgreen'];

export default function Post(props) {
    let linkType = props.linkType === 'main' ? 'main' : 'ticket';
    let linkTo = linkType === 'main' ? '/home' : '/ticket'
    linkTo = `${linkTo}/${props.id}`;
    //console.log(linkType);
    return (
        <Link className='post-list-link' to={linkTo}>
          <div className="post">
              <img src={props.img} className="img-post" alt='post-list-tutor-img'/>
              <div className="detail">
                  <div className="tag-subject"><span className="dot" style={{ background : `${colorTag[props.tagId]}` }}/><h2 className="subject">{props.tag}</h2></div>
                  <div className="topic">#Topic       : {props.topic}</div>
                  <div className="topic">@Location   : {props.location}</div>
                  <div className="topic">Date        : {props.date}</div>
              </div>
              <div className="numjoin"><p>Join {props.amount}/{props.full}</p></div>
          </div>
        </Link>
    )
}
