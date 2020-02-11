import React from 'react'
import './style.css'
import {data} from '../../../../data'

export default function Post(props) {
    return (
        <div className="post">
            <img src={props.img} className="img-post" />
            <div className="detail">
                <h2>{props.subject}</h2>
                <h4>{props.topic}</h4>
                <h4>{props.location}</h4>
                <h4>{props.date}</h4>
            </div>
        </div>
    )
}
