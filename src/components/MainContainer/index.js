import React from 'react'
import SubContainer from '../../components/SubContainer/index';
import MyTuelist from '../../components/MyTuelist/index';
import './style.css'

export default function MainContainer() {
    return (
        <div>  
            <div className="grid-mainfeed">
                <SubContainer />
                <MyTuelist />
            </div>
        </div>
    )
}
