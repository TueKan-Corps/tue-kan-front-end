import React from 'react'
import Banner from './Banner/index'
import Postlist from './Postlist/index' 

import { storeProduct } from '../../data'

import './style.css'

import {
  Switch,
  Route,
  useParams,
} from "react-router-dom";

const Main =()=> {
  return (
    <>
      <Banner />
      <Postlist postData={storeProduct} linkTo='/home' />
    </>
  );
}

const Sub =()=> {
  let { postId } = useParams();
  let postData = storeProduct[postId-1];
  console.log(postId);
  return (
    <div>
      <p>{postId}</p>
      <p>{postId}</p>
      <p>{postData.topic}</p>
      <p>Love U</p>
      <p>Love U</p>
      <p>Love U</p>
      <p>Love U</p>
      <p>Love U</p>
    </div>
  );
}

export default function SubContainer() {
    return (
        <div className="sub-container">

          <Switch>

            {/*
              if don't go to sub-cate, it show category.
              if go to sub-cate, it link to this sub-cate with nested route.
            */}

            <Route exact path={'/'} component={Main} />
            <Route exact path={`/home/:postId`} component={Sub} />

          </Switch>


        </div>
    )
}
