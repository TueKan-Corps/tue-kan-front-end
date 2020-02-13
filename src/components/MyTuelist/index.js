/*
  add in 12-Feb-20 'Boat'
  12:33 complete not responsive

*/

import React from 'react'
import './style.css'

import {listData} from './listData.js';

import { Link } from "react-router-dom";

const CreateListItem =(props)=> {
  //console.log(props.id);
  let colorTag = ['skyblue', 'rgb(255,197,130)', 'pink', 'rgb(241,184,255)', 'lightgreen'];
  return (
    <Link className='mtl-item-link' to='#'>
      <div className='mtl-item'>
        <span className='item-tag-color' style={{background: `${colorTag[props.tagId]}`}}> </span>
        <p className='item-topic item-text'>{props.topic}</p>
        <p className='item-tutor item-text'>{props.date}</p>
      </div>
    </Link>
  )
}

export default function MyTuelist() {
    return (
        <div className ="my-tue-list-container">
            <div className='mtl-header'>
              <p className='header-name'><b>My tue list</b></p>
              <Link className='show-btn'>show all</Link>
            </div>
            <div className='mtl-body'>
              {
                listData.map(list => {
                  let {id, ...other} = list;
                  //console.log(other);
                  return (
                    /* can use <CreateListItem key={list.id} {...list} /> */
                    <CreateListItem key={id} {...other}  />
                  )
                })
              }
            </div>
        </div>
    )
}
