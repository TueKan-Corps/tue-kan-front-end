import React from 'react';

import {menuList} from './menuList.js';

import './style.css';

import { Link, useRouteMatch } from "react-router-dom";

const CreateItem =(props)=> {
  let { path } = useRouteMatch();
  let isOn = (path === props.path || path === props.path2);
  let isOnColor = isOn ? '#4BCCFF' : 'black';
  //console.log(path);

  /*
    if url is equal path of item ->
    item color is blue and having arrow on left of item else item color is black.
  */

  return (
      <div className={`${props.name}-box side-menu-item`}>
        {isOn && <i className="fas fa-caret-right item-on-cursor"></i>}
        <Link className='item-link' to={props.path} style={{color: `${isOnColor}`}}>
          <i className={`${props.icon} item-icon`}></i>
          <p className='item-name'><b>{props.name}</b></p>
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
            <CreateItem key={item.id} icon={item.icon} name={item.name} path={item.path} path2={item.path2} />
          ))
        }
      </div>
    );
  }

}

export default SideMenu;
