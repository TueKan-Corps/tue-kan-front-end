import React from 'react'
import './style.css'
import {data} from '../../../../data'


let colorTag = ['skyblue', 'rgb(255,197,130)', 'pink', 'rgb(241,184,255)', 'lightgreen'];

export default function Post(props) {
    return (
        <div className="post">
            <img src={props.img} className="img-post" />
            <div className="detail">
                <div className="tag-subject"><span className="dot" style={{ background : `${colorTag[props.tagId]}` }}/><h2 className="subject">{props.subject}</h2></div>
                <div className="topic">#Topic       : {props.topic}</div>
                <div className="topic">@Location   : {props.location}</div>
                <div className="topic">Date        : {props.date}</div>
                
            </div>
            <div className="numjoin"><p>Join {props.amount}/{props.full}</p></div>
            
        </div>
    )
}
