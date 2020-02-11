import React from 'react'
import './style.css'
import {data} from '../../../../data'

export default function Post(props) {
    return (
        <div className="post">
            <img src={props.img} className="img-post" />
            <div className="detail">
                <h2>{props.subject}</h2>
                <h3>#Topic       : {props.topic}</h3>
                <h4>@Location   : {props.location}</h4>
                <h4>Date        : {props.date}</h4>
                
            </div>
            <div className="numjoin"><p>Join {props.amount}/{props.full}</p></div>
            
        </div>
    )
}
