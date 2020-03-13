import React from 'react'
import SubContainer from '../../components/SubContainer/index';
import MyTuelist from '../../components/MyTuelist/index';
import './style.css'
import MainDiv from '../../pages/mainDiv.js';
 
export default function MainContainer() {
    return (
      <MainDiv>
        <SubContainer />
        <MyTuelist />
      </MainDiv>
    )
}
