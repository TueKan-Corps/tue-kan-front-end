/*
  .edit 21-Feb-20 [Boat]
    -- change from Link to NavLink.
    -- demove active link cursor in SideMenu.
    -- edit path of home from '/home' to '/'.
  .edit 10-Mar-20 [Boat]
    -- add ternary op if route to home <NavLink> exact else <NavLink> not exact.
  .edit 08-Apr-20 [Boat]
    -- remove ternary op and use boolean instead.
*/

import React from 'react';

import {menuList} from './menuList.js';

import './style.css';

import { NavLink } from "react-router-dom";

const CreateItem =(props)=> {
  let isHome = props.path === '/';
  return (
      <div className={`${props.name}-box side-menu-item`}> 
        <NavLink exact={isHome} className='item-link' to={props.path} activeStyle={{ color: '#4BCCFF'}}>
          <i className={`${props.icon} item-icon`}></i>
          <p className='item-name'><b>{props.name}</b></p>
        </NavLink> 
      </div>
  );
}

class SideMenu extends React.Component {

  render () {
    return (
      <div className='side-menu-container'>
        {
          menuList.map(item => (
            <CreateItem key={item.id} icon={item.icon} name={item.name} path={item.path} />
          ))
        }
      </div>
    );
  }

}

export default SideMenu;
