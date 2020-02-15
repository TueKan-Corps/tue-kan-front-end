/*
  .add in 13-Feb-20
  .edit 14-Feb-20
    -- make tag select, radio-button, submit complete
    -- not complete form
    -- not responsive
*/

import React from 'react';

import './style.css';

import {createPostData} from './createPostData.js';

import { Link } from "react-router-dom";

import SideBar from '../../components/sideBar/index.js';
import MyTueList from '../../components/MyTuelist/index.js';

const CreateItem =(props)=> {
  //console.log(props.type);
  //console.log(props.option);
  return (
    <div className={`${props.headerName} item`}>
      <p className='head-text'>{props.headerName}</p>

      {/* input */}
      {
        props.type === 'text' &&
        <input className={`input ${props.width}`} type='text' placeholder={props.placeholder} id={props.name} name={props.name} required></input>
      }

      {/* radio button */}
      {
        props.type === 'radio' &&
        props.option.map(item => (
          <div key={item.id} className='radio-option'>
            <input type='radio' id={item.value} name={item.name} value={item.value} required ></input>
            <label>{item.value}</label>
          </div>
        ))
      }

      {/* select */}
      {
        props.type === 'select' &&
        <select className={`input ${props.width}`} id={props.name} name={props.name} required>
        {
          props.option.map(item => (
            <>
            {
              item.id === 0 ?
              <option value='' defaultValue>{item.value}</option>
              :
              <option value={item.value}>{item.value}</option>
            }
            </>
          ))
        }
        </select>
      }

      {/* text area */}
      {
        props.type === 'textarea' && <textarea className={`input ${props.width} big`} form='create-post-form' ></textarea>
      }
    </div>
  );
}

class CreatePost extends React.Component {

  render () {
    return (
      <>
        <SideBar />
        <div className='create-post-main-container'>
          <div className='create-post-sub-container'>
            <div className='post-header' onClick={()=>window.history.back()}>
              <i className="header-item header-back-icon fas fa-chevron-left"></i>
              <p className='header-item header-text'><b>POST</b></p>
            </div>

            <div className='create-post-detail'>
              <div className='detail-header'>
                <p className='detail-header-text'>Post setting</p>
              </div>
              <form className='detail-body' id='create-post-form' action='#'>
                {
                  createPostData.map(data => (
                    <CreateItem key={data.id} {...data} />
                  ))
                }
                <button className='submit-btn' type='submit'><b>Create</b></button>
              </form>
            </div>

          </div>
          <MyTueList />

        </div>
      </>
    );
  }

}

export default CreatePost;
