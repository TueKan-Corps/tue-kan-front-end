/*
  .add in 19-Mar-20
    -- add profile description.
    -- add edit button, make can edit description (don't edit in backend yet).
    -- edit edit button, make can edit contact (don't edit in backend yet). 22:50
  .edit in 24-Mar-20
    -- edit to using data from backend instead of data from local.
*/

import React from 'react';
import axios from 'axios';

import './style.css';

//import { profileData } from '../../components/avatar/profileData.js';

import MyTueList from '../../components/MyTuelist/index.js';
import LoadingPostList from '../../components/loadingPostList/index.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

class Profile extends React.Component {

  state = {
    loading: true,
    isShowMore: false,
    isEdit: false,
    profileData: {},
    description: {},
    contact: {},
  }

  setShowMore =(isSet)=> {
    this.setState(state => ({
      isShowMore: isSet,
    }))
  }

  setEdit =()=> {
    if (this.state.isEdit === true)
    {
      /// send POST here
      alert('เซฟข้อมูลสำเร็จ !');
      const url ='https://mock-up-tuekan-backend.herokuapp.com/profile';
      let newData = this.state.profileData;
    }

    this.setState(state => ({
      isEdit: !state.isEdit,
    }))
  }

  onInputChange =(event)=> {
    this.setState({
      [event.target.name]: event.target.value
    })
      //console.log(event);
  }

  onInputLinkChange =(event, index)=> {
    /// 1. Make a shallow copy of the items
    let items = this.state.contact;
    /// 2. Make a shallow copy of the item you want to mutate
    let item = items[index];
    /// 3. Replace the property you're intested in
    item.link = event.target.value;
    /// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    /// 5. Set the state to our new copy
    this.setState({
      contact: items,
    });
  }

  componentDidMount () {
    const url ='https://mock-up-tuekan-backend.herokuapp.com/profile';
    //const url ='https://mock-up-tuekan-backend.herokuapp.com/profile';
    this.setState({loading: true})
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          profileData: data.data,
          description: data.data[0].description,
          contact: data.data[0].contact,
        })
        console.log('data');
        console.log(data);
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  }

  render () {
    let isShowMore = this.state.isShowMore;
    let isEdit = this.state.isEdit;
    let profileData = this.state.profileData[0];
    let description = String(this.state.description);
    let contact = this.state.contact;
    let contactImg = [
      require('../../assets/icon/facebook.png'),
      require('../../assets/icon/ig.png'),
      require('../../assets/icon/youtube.png'),
      require('../../assets/icon/email.png'),
      require('../../assets/icon/website.png')
    ]

    /*console.log('Data555')
    console.log(profileData)
    console.log(description)
    console.log(contact)*/

    let desLen = description.length;
    let desOverLen = desLen > 250;
    let desForShow = (!isEdit && desOverLen && !isShowMore) ? `${description.substring(0, 250)}` : description;
    let contactEditStyle = isEdit ? {maxWidth: '400px', background: ''} : {};

    //console.log('this.state.profileData');
    //console.log(this.state.loading);

    return (
      <MainDiv className='profile-main-container'>
        <SubDiv className='profile-sub-container'>
          <div className='post-header profile-detail-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Profile</b></p>
          </div>

          {
            this.state.loading &&
            <LoadingPostList length={1} />
          }
          {
            !this.state.loading &&
            <div className='profile-detail-container'>
              <div className='profile-detail-box'>

                <div className='img-box'>
                  <img className='profile-img' src={profileData.img} alt='profile-img' />
                </div>

                <div className='profile-description' >

                  <div className='edit-box' onClick={()=>this.setEdit()}>
                    <i className="edit-detail fas fa-user-edit"></i>
                    {/* toggle edit and save button. */}
                    { !isEdit && <p className='edit-detail edit-text'>Edit</p>}
                    { isEdit && <p className='edit-detail edit-text'>Save</p>}
                  </div>

                  <p className='description-text description-name'>{`${profileData.firstName} ${profileData.lastName}`}</p>
                  {/* don't using edit mode, it show normal description. */}
                  {/* using edit mode, it show textarea to edit description. */}
                  { !isEdit && <p className='description-text description-des'>{desForShow}</p>}
                  { isEdit && <textarea className='description-text description-des-input' name='description' value={this.state.description} maxLength='400' spellCheck='false' onChange={this.onInputChange}></textarea>}

                  {/* if string is overlen, must be substring and add show more button. */}
                  { (!isEdit && desOverLen && !isShowMore) && <span className='des-spc-text' onClick={()=>this.setShowMore(true)}> ... MORE</span> }
                  { (!isEdit && isShowMore) &&  <span className='des-spc-text' onClick={()=>this.setShowMore(false)}> ... LESS</span>}

                </div>

                <div className='contact-box'>

                  <div className='contact-header'>
                    <i className='contact-icon fas fa-address-book'></i>
                    <p className='contact-text'>Contact</p>
                  </div>

                  <div className='contact-detail' style={contactEditStyle}>
                  {
                    /* don't using edit mode, it show normal contact. */
                    !isEdit ?
                    this.state.contact.map((contact, index) => (
                      <a key={contact.id} href={contact.link}>
                        <img className='contact-img' src={contactImg[index]} alt={contact.name} />
                      </a>
                    ))
                    :
                    /* using edit mode, it show input to edit link. */
                    this.state.contact.map((contact, index) => (
                      <div className='contact-edit-box' key={contact.id}>
                        <label className='contact-edit contact-name'>{contact.name}</label>
                        <input className='contact-edit contact-input' type='text' name={contact.name} value={this.state.contact[index].link} spellCheck='false' onChange={(event)=>this.onInputLinkChange(event, index)}></input>
                      </div>
                    ))
                  }
                  </div>

                </div>

              </div>
            </div>
          }

      </SubDiv>

      <MyTueList isUpdate={false} />

    </MainDiv>
    );
  }

}

export default Profile;
