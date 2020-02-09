import React from 'react';

import {menuList} from './menuList.js';

import './style.css';

import { Link } from "react-router-dom";

const CreateItem =(props)=> {
  return (
      <div className={`${props.name}-box side-menu-item`}>
        <Link className='item-link' to={props.path}>
          <i className={`${props.icon} item-icon`}></i>
          <p className='item-name'>{props.name}</p>
        </Link>
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
