import React from 'react'
import Post from './Post/index'
import { storeProduct } from '../../../data'

export default  () => {
    return (
        <div>
            {storeProduct.map(data => (
                <Post key={data.id} subject={data.subject} img={data.img} topic={data.topic} location={data.topic} type={data.type}/>
            ))}
            Hello from Postlist
            
        </div>
    )
}
