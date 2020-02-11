import React from 'react'
import Banner from './Banner/index'
import Postlist from './Postlist/index'

import './style.css'

export default function SubContainer() {
    return (
        <div className="sub-container">
            <h2>Hello From SubContainer</h2>
            <Banner />
            <Postlist />
        </div>
    )
}
