import React from 'react'
import { storeProduct } from '../../../../data'
import './style.css'

export default function Post() {
    return (
        <div className="post">
            <img src="img/product-8.png" className="img-post" />
            <div className="detail">
                <h3>Subject</h3>
                <h4>#Topic</h4>
                <h4>@Location</h4>
            </div>
        </div>
    )
}
