/*
  .add in 05-May-20
*/

import React from 'react';
import {
    Switch,
    Route,
    useParams, 
} from "react-router-dom";
import axios from 'axios';

import './style.css';

import MyTueList from '../../components/MyTuelist/index.js';
import LoadingPostList from '../../components/loadingPostList/index.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js'; 

const ProfileView =(props)=> {
    
    let { profileId } = useParams();
    const [state, setState] = React.useState({ 
        loading: true,
        isShowMore: false,
        profileData: {},
        description: {},
        contact: {}
    });
 
    const setShowMore = (isSet) => {
        setState({
            ...state,
            isShowMore: isSet,
        })
    }

    React.useEffect(() => {
        let url = `https://tue-kan.herokuapp.com/account/${profileId}`; 
        /// get account data
        axios.get(url)
            .then(data => {
                setState({
                    ...state,
                    loading: false,
                    profileData: data.data[0],
                    description: data.data[0].description,
                    contact: data.data[0].contact,
                })
                //console.log('data');
                //console.log(data);
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))  
        // eslint-disable-next-line
    }, []);
 
    let accountId = props.accountId;
    let isShowMore = state.isShowMore;
    let isEdit = state.isEdit;
    let profileData = state.profileData; 
    let description = String(state.description);
    let contactImg = [
        require('../../assets/icon/facebook.png'),
        require('../../assets/icon/ig.png'),
        require('../../assets/icon/youtube.png'),
        require('../../assets/icon/email.png'),
        require('../../assets/icon/website.png')
    ]

    let desLen = description.length;
    let desOverLen = desLen > 250;
    let desForShow = (!isEdit && desOverLen && !isShowMore) ? `${description.substring(0, 250)}` : description;
    let contactEditStyle = isEdit ? { maxWidth: '450px', background: '' } : {};
 
    return (
        <MainDiv className='profile-main-container'>
            <SubDiv className='profile-sub-container'>
                <div className='post-header profile-detail-header' onClick={() => window.history.back()}>
                    <i className="header-item header-back-icon fas fa-chevron-left"></i>
                    <p className='header-item header-text'><b>Profile</b></p>
                </div>

                {
                    state.loading &&
                    <LoadingPostList length={1} />
                }
                {
                    !state.loading &&
                    <div className='profile-detail-container'>
                        <div className='profile-detail-box'>

                            <div className='img-box'>
                                <img className='profile-img' id={`profile-img-${accountId}`} src={`https://tue-kan.herokuapp.com/account/img/${profileId}`} alt='profile-img' />
                            </div>

                            <div className='profile-description' >
 
                                {!isEdit && <p className='description-text description-name'>{`${profileData.first_name} ${profileData.last_name}`}</p>}

                                {/* don't using edit mode, it show normal description. */}
                                {/* using edit mode, it show textarea to edit description. */}
                                {!isEdit && <p className='description-text description-des'>{desForShow}</p>}

                                {/* if string is overlen, must be substring and add show more button. */}
                                {(!isEdit && desOverLen && !isShowMore) && <span className='des-spc-text' onClick={() => setShowMore(true)}> ... MORE</span>}
                                {(!isEdit && isShowMore) && <span className='des-spc-text' onClick={() => setShowMore(false)}> ... LESS</span>}

                            </div>

                            <div className='contact-box'>

                                <div className='contact-header'>
                                    <i className='contact-icon fas fa-address-book'></i>
                                    <p className='contact-text'>Contact</p>
                                </div>

                                <div className='contact-detail' style={contactEditStyle}>
                                    {
                                        /* don't using edit mode, it show normal contact. */
                                        !isEdit &&
                                        state.contact.map((contact, index) => (
                                            <a key={contact.ID} href={`https://${contact.Link}`}>
                                                <img className='contact-img' src={contactImg[index]} alt={contact.name} />
                                            </a>
                                        ))
                                    }
                                </div>

                            </div>

                        </div>
                    </div>
                }

            </SubDiv>

            <MyTueList />

        </MainDiv>
    ); 
}

const ViewProfileMain =()=> {  
    return (
        <Switch>  
            <Route exact path={`/view-profile/:profileId`} component={() => <ProfileView />} /> 
        </Switch> 
    );
}

export default ViewProfileMain;
