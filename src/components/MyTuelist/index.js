/*
  .add in 12-Feb-20 'Boat'
    - 12:33 complete not responsive
  .edit 20-Mar-20 [Boat]
    -- test with backend mockup.
    -- add skeleleton loading component.
  .edit 01-Apr-20
    -- edit to use real data from real database server.
  .edit 02-Apr-20
    -- edit to use centralized account_id.

*/

import React from 'react'
import axios from 'axios';
import './style.css'

import {accountData} from '../../components/avatar/accountData.js';

import LoadingPostList from '../../components/loadingPostList/index.js';

import { Link } from "react-router-dom";

const CreateListItem =(props)=> {
  //console.log(props.id);
  let colorTag = ['skyblue', 'rgb(255,197,130)', 'pink', 'rgb(241,184,255)', 'lightgreen'];
  let isTopicOverLen = props.topic.length > 16;
  let topicDisplay = isTopicOverLen ? props.topic.substring(0, 15) + '...' : props.topic;
  //console.log(props.tag_id);
  return (
    <Link className='mtl-item-link' to={`/ticket/${props.id}`}>
      <div className='mtl-item'>
        <span className='item-tag-color' style={{background: `${colorTag[props.tag_id]}`}}> </span>
        <div className='item-text-box'>
          <p className='item-topic item-text'>{topicDisplay}</p>
          <p className='item-date item-text'>{props.date}</p>
        </div>
      </div>
    </Link>
  )
}

export default class MyTuelist extends React.PureComponent {

  state = {
    loading: true,
    ticketData: {}
  }

  componentDidMount () {
    let accountId = accountData.account_id;
    const url = `https://tue-kan.herokuapp.com/ticket/${accountId}`;
    this.setState({loading: true})
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          ticketData: data.data
        })
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  }

  /*shouldComponentUpdate (props) {
    return props.isUpdate;
  }*/

  render () {
    let ticketData = this.state.ticketData;
    return (
      <div className ="my-tue-list-container">
        <div className='mtl-header'>
          <p className='header-name'><b>My tue list</b></p>
          <Link className='show-btn' to='/ticket'>show all</Link>
        </div>
        <div className='mtl-body'>
        {
          this.state.loading &&
          <LoadingPostList length={1} />
        }
        {
          !this.state.loading &&
          ticketData.map(list => (
            <CreateListItem key={list.id} {...list}  />
          ))
        }
        </div>
      </div>
    )

  }
}
