import React from 'react'
import SubContainer from '../../components/SubContainer/index';
import MyTuelist from '../../components/MyTuelist/index';
import './style.css'
import SideBar from '../sideBar/index';

export default function MainContainer() {
    return (
        <div>  
            <div className="grid-mainfeed">
                <SideBar/>
                <SubContainer />
                <MyTuelist />

            </div>
        </div>
    )
}
