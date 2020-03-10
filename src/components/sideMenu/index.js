/*
  .edit 21-Feb-20 [Boat]
    -- change from Link to NavLink
    -- demove active link cursor in SideMenu
    -- edit path of home from '/home' to '/'
  .edit 10-Mar-20 [Boat]
    -- add ternary op if route to home <NavLink> exact else <NavLink> not exact
*/

import React from 'react';

import {menuList} from './menuList.js';

import './style.css';

import { NavLink, useRouteMatch } from "react-router-dom";

const CreateItem =(props)=> {
  return (
      <div className={`${props.name}-box side-menu-item`}>
        {
          props.path === '/' ?
          <NavLink exact className='item-link' to={props.path} activeStyle={{color: '#4BCCFF'}}>
            <i className={`${props.icon} item-icon`}></i>
            <p className='item-name'><b>{props.name}</b></p>
          </NavLink>

          :

          <NavLink className='item-link' to={props.path} activeStyle={{color: '#4BCCFF'}}>
            <i className={`${props.icon} item-icon`}></i>
            <p className='item-name'><b>{props.name}</b></p>
          </NavLink>
        }
      </div>
  );
}

class SideMenu extends React.Component {

  render () {
    return (
      <div className='side-menu-container'>
        {
          menuList.map(item => (
            <CreateItem key={item.id} icon={item.icon} name={item.name} path={item.path} path2={item.path2} />
          ))
        }
      </div>
    );
  }

}

export default SideMenu;
