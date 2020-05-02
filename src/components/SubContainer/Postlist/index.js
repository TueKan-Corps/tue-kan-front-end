/*
  .edit 10-Mar-20 [Boat]
    -- edit to pass object from parent instead of import object in this component. for flexible to use.
  .edit 14-Apr-20 [Boat]
    -- add component for empty list.
*/

import React from 'react'
import Alert from 'react-bootstrap/Alert' 

import Post from './Post/index'

export default function Postlist(props) {
  let postData = props.postData;
  let isEmpty = postData.length === 0;
  let emptyLinkTo = props.linkTo === '/ticket' ? '/' : '/createPost';
  
  return (
    <div className="post-list">
    {
      /// check length of postData. if isn't empty -> show dataList.
      /// else -> show text 'no items'.
      isEmpty !== true ?
      postData.map((data, index) => (
        <Post key={data.id} postId={index} {...data} linkTo={props.linkTo}/>
      ))
      :
      <Alert className='posting-empty-alert' variant="success">
        <Alert.Heading>Hey, nice to see you.</Alert.Heading>
        <p>
            You haven't any item now.
        </p>
        <hr />
        <a className="mb-0" href={emptyLinkTo}>
          You can see items list or create here.
        </a>
      </Alert> 
    }
    </div>
  )
}
