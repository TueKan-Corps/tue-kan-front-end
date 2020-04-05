/*
  .add in 19-Mar-20
    -- add profile description.
    -- add edit button, make can edit description (don't edit in backend yet).
    -- edit edit button, make can edit contact (don't edit in backend yet). 22:50
  .edit in 24-Mar-20
    -- edit to using data from backend (mockup) instead of data from local.
  .edit 02-Apr-20
    -- edit to use real data from real database server.
    -- edit to use centralized account_id.
*/

import React from 'react';
import axios from 'axios';

import './style.css';

import {accountData} from '../../components/avatar/accountData.js';

import { profileData as tempProfile } from '../../components/avatar/profileData.js';

import MyTueList from '../../components/MyTuelist/index.js';
import LoadingPostList from '../../components/loadingPostList/index.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

class Profile extends React.Component {

  state = {
    loading: true,
    isShowMore: false,
    isEdit: true,
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
      /*let data = this.state.profileData;
      let accountId = accountData.account_id;
      delete data["username"];
      delete data["password"];
      delete data["coin_amount"];
      data["account_id"] = accountId;
      data["description"] = this.state.description;
      data["contact"] = this.state.contact;

      let url = `https://tue-kan.herokuapp.com/account/update`;
  
      axios.post(url, data)
        .then((res) => {
          console.log(res.data)
        }).catch((error) => {
          console.log(error)
        });

      alert('เซฟข้อมูลสำเร็จ !'); */

      //console.log("POST");
      //console.log(data);
    }  

    this.setState(state => ({
      isEdit: !state.isEdit,
    }))
  }

  onInputChange =(event)=> {
    let eventName = event.target.name;
    //console.log(eventName);
    if (eventName !== 'first_name' && eventName !== 'last_name') {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    else {
      let newData = this.state.profileData;
      newData[eventName] = event.target.value;
      //console.log(newData);
      this.setState({
        profileData: newData
      })
    }
      //console.log(event);
  }

  onInputLinkChange =(event, index)=> {
    /// 1. Make a shallow copy of the items
    let items = this.state.contact;
    /// 2. Make a shallow copy of the item you want to mutate
    let item = items[index];
    /// 3. Replace the property you're intested in
    item.Link = event.target.value;
    /// 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    /// 5. Set the state to our new copy
    this.setState({
      contact: items,
    });

    //console.log("this.state.contact");
    //console.log(this.state.contact);
  }

  imgSelected =(event)=> {
    let imgData = event.target.files[0];
    /// upload picture here
    console.log(imgData);
  }

  componentDidMount () {
    let accountId = accountData.account_id;
    const url = `https://tue-kan.herokuapp.com/account/${accountId}`;
    this.setState({loading: true})
    axios.get(url)
      .then(data => {
        this.setState({
          loading: false,
          profileData: data.data[0],
          description: data.data[0].description,
          contact: data.data[0].contact,
        })
        //console.log('data');
        //console.log(data);
      })
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    //console.log('loading complete!');
  }

  render () {
    let isShowMore = this.state.isShowMore;
    let isEdit = this.state.isEdit;
    let tempImg = tempProfile.img;
    let profileData = this.state.profileData; 
    let description = String(this.state.description); 
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
    let contactEditStyle = isEdit ? {maxWidth: '450px', background: ''} : {};

    //console.log('this.state.profileData');
    //console.log(this.state.contact);

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
                  {/*<img className='profile-img' src={profileData.img} alt='profile-img' />*/}
                  <img className='profile-img' src={tempImg} alt='profile-img' />
                  { 
                    isEdit &&
                    <label for='upload-img'>
                      <i className="fas fa-upload upload-img-img"></i>
                      <input type='file' id='upload-img' onChange={this.imgSelected} accept='image/*' style={{display: 'none'}}></input>
                    </label>
                  }
                </div>

                <div className='profile-description' >

                  <div className='edit-box' onClick={()=>this.setEdit()}>
                    <i className="edit-detail fas fa-user-edit"></i>
                    {/* toggle edit and save button. */}
                    { !isEdit && <p className='edit-detail edit-text'>Edit</p>}
                    { isEdit && <p className='edit-detail edit-text'>Save</p>}
                  </div>

                  { 
                    isEdit && 
                    <>
                      <input className='description-text description-name-input' name='first_name' value={profileData.first_name} onChange={this.onInputChange} spellCheck={false}></input>
                      <input className='description-text description-name-input' name='last_name' value={profileData.last_name} onChange={this.onInputChange} spellCheck={false}></input>
                    </>
                  }
                  { !isEdit && <p className='description-text description-name'>{`${profileData.first_name} ${profileData.last_name}`}</p>}

                  {/* don't using edit mode, it show normal description. */}
                  {/* using edit mode, it show textarea to edit description. */}
                  { !isEdit && <p className='description-text description-des'>{desForShow}</p>}
                  { isEdit && <textarea className='description-text description-des-input' name='description' value={description} maxLength='400' spellCheck='false' onChange={this.onInputChange}></textarea>}

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
                      <a key={contact.ID} href={`https://${contact.Link}`}>
                        <img className='contact-img' src={contactImg[index]} alt={contact.name} />
                      </a>
                    ))
                    :
                    /* using edit mode, it show input to edit link. */
                    this.state.contact.map((contact, index) => (
                      <div className='contact-edit-box' key={contact.ID}>
                        <label className='contact-edit contact-name'>{contact.Name}</label>
                        <input className='contact-edit contact-input' type='text' name={contact.Name} value={contact.Link} spellCheck='false' onChange={(event)=>this.onInputLinkChange(event, index)}></input>
                      </div>
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

}

export default Profile;
