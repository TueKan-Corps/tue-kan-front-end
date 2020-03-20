/*
  .add in 19-Mar-20
    -- add profile description.
    -- add edit button, make can edit description (don't edit in backend yet).
    -- edit edit button, make can edit contact (don't edit in backend yet). 22:50
*/

import React from 'react';

import './style.css';

import { profileData } from '../../components/avatar/profileData.js';

import MyTueList from '../../components/MyTuelist/index.js'; 

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';

class Profile extends React.Component {

  state = {
    isShowMore: false,
    isEdit: false,
    description: profileData.description,
    contact: profileData.contact,
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
      //console.log(this.state);
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

  render () {
    let isShowMore = this.state.isShowMore;
    let isEdit = this.state.isEdit;
    let desOverLen = profileData.description.length > 250;
    let desForShow = (!isEdit && desOverLen && !isShowMore) ? `${profileData.description.substring(0, 250)}` : profileData.description;
    let contactEditStyle = isEdit ? {maxWidth: '400px', background: ''} : {};
    //console.log(this.state.contact);
    return (
      <MainDiv className='profile-main-container'>
        <SubDiv className='profile-sub-container'>
          <div className='post-header profile-detail-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>Profile</b></p>
          </div>

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
                  profileData.contact.map(contact => (
                    <a key={contact.id} href={contact.link}>
                      <img className='contact-img' src={contact.img} alt={contact.name} />
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

      </SubDiv>

      <MyTueList />

    </MainDiv>
    );
  }

}

export default Profile;
