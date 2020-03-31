/*
  .edit 10-Mar-20 [Boat]
    -- edit to route (main, ticket)
  .edit 13-Mar-20 [Boat]
    -- edit to pass props instead define in function.
*/

import React from 'react'
import './style.css'

import { Link } from 'react-router-dom';

let colorTag = ['skyblue', 'rgb(255,197,130)', 'pink', 'rgb(241,184,255)', 'lightgreen'];
let subject = ['Mathematic', 'Science', 'Thai', 'Social', 'Eng'];

export default function Post(props) {
    let linkTo = props.linkTo;
    linkTo = `${linkTo}/${props.postId + 1}`;
    //console.log(props.tag_id);
    return (
        <Link className='post-list-link' to={linkTo}>
          <div className="post">
              <img src={props.img} className="img-post" alt='post-list-tutor-img'/>
              <div className="detail">
                  <div className="tag-subject"><span className="dot" style={{ background : `${colorTag[props.tag_id]}` }}/><h2 className="subject">{subject[props.tag_id]}</h2></div>
                  <div className="topic">#Topic       : {props.topic}</div>
                  <div className="topic">@Location   : {props.location}</div>
                  <div className="topic">Date        : {props.date}</div>
              </div>
              <div className="numjoin" ><p>Join {props.amount}/{props.full}</p></div>
          </div>
        </Link>
    )
}
