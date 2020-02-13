import React from 'react'
import Post from './Post/index'
import { storeProduct } from '../../../data'

export default function Postlist() {
    return (
        <div className="post-list">
            {storeProduct.map(data => (
                <Post key={data.id} subject={data.subject} img={data.img} topic={data.topic} location={data.location} type={data.type} date={data.date} amount={data.amount} full={data.full} tagId={data.tagId}/>
            ))}
        </div>
    )
}
