/*
  .edit 10-Mar-20 [Boat]
    -- edit to pass object from parent instead of import object in this component. for flexible to use.
*/

import React from 'react'
import Post from './Post/index'

export default function Postlist(props) {
  let postData = props.postData;
    return (
        <div className="post-list">
            {postData.map(data => (
                <Post key={data.id} {...data} linkTo={props.linkTo}/>
            ))}
        </div>
    )
}
