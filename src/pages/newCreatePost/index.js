/*
  .add in 13-Feb-20
  .edit 14-Feb-20
    -- make tag select, radio-button, submit complete
    -- not complete form
    -- not responsive
  .edit 20-Feb-20
    -- change to use styled-components instead css
  .edit 21-Feb-20
    -- date with input type date (not validate)
    -- time with input type time
    -- make style of main, sub container to MainDiv, SubDiv
    -- some responsive
    -- make submit with state
  .edit 11-Mar-20
    -- change div of postsetting to styled for reuse at ticket
  .edit 12-Mar-20
    -- add duration of tue.
*/

import React from 'react';

import {category} from './category.js';

import './style.css';

import styled from 'styled-components';
import DetailContainer from './detailContainer.js';
import DetailBody from './detailBody.js';
import DetailHeader from './detailHeader.js';

import MainDiv from '../mainDiv.js';
import SubDiv from '../subDiv.js';
import MyTueList from '../../components/MyTuelist/index.js';

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
})`
  width: 15%;
  margin-right: 60%;
`;

const NumberBox = styled(TimeBox).attrs({
  type: 'number',
  min: '0.5',
  max: '5',
})`
`;

const DateBox = styled(TextBox).attrs({
  type: 'date',
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

class NewCreatePost extends React.Component {

  state = {
    topic: '',
    location: '',
    date: '',
    time: '',
    duration: '',
    category: '',
    type: '',
    price: '',
    description: '',
  }

  onInputChange =(event)=> {
    this.setState({
      [event.target.name] : event.target.value
    })
      //console.log(this.state);
  }

  onSubmit =(event)=> {
    event.preventDefault();
    console.log(this.state);
  }

  render () {
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
                  <HeadText className='header-text'>Topic :</HeadText>
                  <TextBox className='item-input' name='topic' placeholder='Datacomm, Movement, Number Theory' align='left' onChange={this.onInputChange} long required></TextBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Location :</HeadText>
                  <TextBox className='item-input' name='location' placeholder='ECC 801, E12 502 ...' onChange={this.onInputChange} long required></TextBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Date :</HeadText>
                  <DateBox className='item-input' name='date' placeholder='DD/MM/YY' align='left' onChange={this.onInputChange} short required></DateBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Time :</HeadText>
                  <TimeBox className='item-input' name='time' step='1800' align='center' onChange={this.onInputChange} required></TimeBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Duration :</HeadText>
                  <NumberBox className='item-input' name='duration' step='0.5' placeholder='Hr' align='center' onChange={this.onInputChange} short required></NumberBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Category :</HeadText>
                  <SelectBox className='item-input' name='category' onChange={this.onInputChange} short required>
                  {
                    category.map(cate => (
                      <option key={cate.id} value={cate.value}>{cate.name}</option>
                    ))
                  }
                  </SelectBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Tue-type :</HeadText>
                  <SelectBox className='item-input' name='type' onChange={this.onInputChange} short required>
                    <option value=''>--Select--</option>
                    <option value='0'>Free</option>
                    <option value='1'>Premium</option>
                  </SelectBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Price :</HeadText>
                  <TextBox className='item-input' name='price' placeholder='99999' onChange={this.onInputChange} short required></TextBox>
                </FormItem>

                <FormItem className='form-item'>
                  <HeadText className='header-text'>Description :</HeadText>
                  <TextAreaBox className='item-input' name='description' placeholder='tue detail ...' onChange={this.onInputChange} ></TextAreaBox>
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
