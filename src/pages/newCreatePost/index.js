/*
  .add in 13-Feb-20
  .edit 14-Feb-20
    -- make tag select, radio-button, submit complete.
    -- not complete form.
    -- not responsive.
  .edit 20-Feb-20
    -- change to use styled-components instead css.
  .edit 21-Feb-20
    -- date with input type date (not validate).
    -- time with input type time.
    -- make style of main, sub container to MainDiv, SubDiv.
    -- some responsive.
    -- make submit with state.
  .edit 11-Mar-20
    -- change div of postsetting to styled for reuse at ticket.
  .edit 12-Mar-20
    -- add duration of tue.
  .edit 31-Mar-20
    -- edit to can POST to server and add new post in main list.
    -- edit to use INT data instead String because using String type make 400 (Bad request) (some variable).
  .edit 01-Apr-20
    -- edit date format to DD/MM/YYYY
  .edit 02-Apr-20
    -- edit date format to MM-DD-YYYY because another format can't sort in database.
    -- [**1] fake account_id.
  .edit 10-Apr-20
    -- validate topic input maxLenth to 20.
    -- [**1] use real account_id.
  .edit 11-Apr-20
    -- validate price input to only integer.
  .edit 12-Apr-20
    -- validate location input maxLenth to 15.
    -- validate Date input to avaiable since today to today + 3 month.
    -- add choice to go to posting when create new post complete.
  .edit 17-Apr-20
    -- edit alert box to use sweetalert2-react.
*/

import React from 'react';
import axios from 'axios'; 

import {category} from './category.js';

import './style.css';

import styled from 'styled-components';
import DetailContainer from './detailContainer.js';
import DetailBody from './detailBody.js';
import DetailHeader from './detailHeader.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';
import MyTueList from '../../components/MyTuelist/index.js';
import accountAccess from '../../components/avatar/accountAccess.js';
import { confirmAlert } from '../../components/confirmAlert.js';

const FormItem = styled.div`
  padding: 10px 10px 10px 10px;
  margin: 0 auto;
  overflow: auto;
  width: 90%;
  > .item-input {
    display: inline;
    float: right;
    padding: 7px 0 7px 10px;
    resize: none;
    border-radius: 20px;
    border: 0;
    background: rgb(235, 235, 235);
  }
  > .item-input:focus {
    outline: none;
    box-shadow: 0px 0px 4px 2px rgb(43,204,255);
  }
`;

const HeadText = styled.p`
  margin: 0;
  display: inline;
  float: left;
  font-size: 20px;
`;

const TextBox = styled.input.attrs({
  type: 'text',
})`
  width: ${props => props.long ? '70%' : '25%'};
  margin-right: ${props => props.long ? '5%' : '50%'};
  text-align: ${props => props.align};
`

const TimeBox = styled(TextBox).attrs({
  type: 'time',
  //value: '08:00',
})`
  width: 15%;
  margin-right: 60%;
`;

const DateBox = styled(TextBox).attrs({
  type: 'date',
})`
`;

const NumBox = styled(TextBox).attrs({
  type: 'number',
  step: '1',
})`
`;

const TextAreaBox = styled.textarea`
  height: 80px;
  width: 70%;
  margin-right: 5%;
`;

const SelectBox = styled.select
`
  width: 25%;
  margin-right: 50%;
`;

let d = new Date();
let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth();
let maxMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 4) : d.getMonth();
let year = d.getFullYear();
let today = year + '-' + month + '-' + (date + 1);
let maxDate = year + '-' + maxMonth + '-' + (date + 1);

class NewCreatePost extends React.Component {

  state = {
    account_id: '',
    topic: '',
    location: '',
    date: '',
    start_time: '',
    stop_time: '',
    max: '',
    category: '',
    price: '0',
    description: '',
  }

  onInputChange =(event)=> {
    this.setState({
      [event.target.name] : event.target.value
    })
      //console.log(this.state);
    let name = event.target.name;
    if (name === 'max' || name === 'category' || name === 'price') {
      this.setState({
        [name]: parseInt(event.target.value)
      })
    }
    if (name === 'date') {
      /// change format of date from YYYY-MM-DD to DD/MM/YYYY
      let oldDate = (event.target.value).split('-');
      //let newData = oldDate[2] + '/' + oldDate[1] + '/' + oldDate[0];
      let newData = oldDate[1] + '-' + oldDate[2] + '-' + oldDate[0];
      this.setState({
        [name]: newData
      })
    }
  }

  onSubmit =(event)=> {
    event.preventDefault();

    // send post here
    let url = `https://tue-kan.herokuapp.com/post/`
    let data = this.state;

    confirmAlert(()=> 
      axios.post(url, data)
        .then((res) => {
          console.log(res.data)
        }).catch((error) => {
          console.log(error)
        })
      , 'ท่านต้องการสร้างโพสต์ใช่หรือไม่ ?', true, 'สร้างโพสต์สำเร็จ!', 'ท่านได้เลิกการสร้างโพสต์!');
  
  }

  componentWillMount () {
    let accountId = parseInt(accountAccess().getAccountId()); 
    this.setState({
      account_id: accountId,
    })
  }

  render () {
    let startTimeArray = this.state.start_time.split(':');
    let hrStart = parseInt(startTimeArray[0]) + 1;
    let hrStop = parseInt(startTimeArray[1]);
    let minHr = hrStop > 0 ? hrStart + ':' + hrStop : hrStart + ':' + hrStop + 0;

    //console.log(today);
    //console.log(maxDate);
    //console.log(hrStart+':'+hrStop);

    return (
      <MainDiv className='create-post-main-container'>
        <SubDiv className='create-post-sub-container'>
          <div className='post-header create-post-detail-header' onClick={()=>window.history.back()}>
            <i className="header-item header-back-icon fas fa-chevron-left"></i>
            <p className='header-item header-text'><b>POST</b></p>
          </div>

          <DetailContainer className='create-post-detail'>
            <DetailHeader className='detail-header' background='rgb(119,218,255)'>
              <p className='detail-header-text'><b>Post setting</b></p>
            </DetailHeader>
            <DetailBody className='detail-body' background='rgb(184,240,255)'>
              <form onSubmit={this.onSubmit}>
                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Topic :</b></HeadText>
                  <TextBox className='item-input' name='topic' placeholder='Datacomm, Movement, Number Theory' align='left' 
                  onChange={this.onInputChange} maxLength='20' long required></TextBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Location :</b></HeadText>
                  <TextBox className='item-input' name='location' maxLength='15' placeholder='ECC 801, E12 502 ...' onChange={this.onInputChange} long required></TextBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Date :</b></HeadText>
                  <DateBox className='item-input' name='date' placeholder='MM-DD-YY' min={today} max={maxDate} onChange={this.onInputChange} short required></DateBox>
                </FormItem>

                {/* step 1800 = add 0.5 hour */}
                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Tue Start :</b></HeadText>
                  <TimeBox className='item-input' name='start_time' step='1800' min='08:00' max='19:00' align='center' onChange={this.onInputChange} required></TimeBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Tue Stop :</b></HeadText>
                  <TimeBox className='item-input' name='stop_time' step='1800' min={minHr} max='20:00' align='center' onChange={this.onInputChange} required></TimeBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Max :</b></HeadText>
                  <NumBox className='item-input' name='max' placeholder='Max participant' min='1' onChange={this.onInputChange} required></NumBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Category :</b></HeadText>
                  <SelectBox className='item-input' name='category' onChange={this.onInputChange} short required>
                  {
                    category.map(cate => (
                      <option key={cate.id} value={cate.value}>{cate.name}</option>
                    ))
                  }
                  </SelectBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Price :</b></HeadText>
                  <NumBox className='item-input' name='price' placeholder='99999' min='0' onChange={this.onInputChange} short required></NumBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'><b>Description :</b></HeadText>
                  <TextAreaBox className='item-input' name='description' placeholder='tue detail ...' onChange={this.onInputChange} spellCheck={false}></TextAreaBox>
                </FormItem>

                <button className='submit-btn' type='submit'><b>Create</b></button>
              </form>
            </DetailBody>
          </DetailContainer>

        </SubDiv>
        <MyTueList />

      </MainDiv>
    );
  }

}

export default NewCreatePost;
