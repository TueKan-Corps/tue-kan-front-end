import React, { Component } from 'react'

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import logo from '../../assets/icon/weblogo_white.png'
import accountAccess from '../../components/avatar/accountAccess.js'
import { AlertCorrect } from '../../helpers/AlertCorrect'
import { AlertInCorrect } from '../../helpers/AlertInCorrect'


// import styled from 'styled-components   '


import accountAccess from '../../components/avatar/accountAccess.js'

import logo from '../../assets/icon/weblogo_white.png'
import guestImg from '../../assets/icon/guest.png';
 
import { notifyAlert } from '../../components/confirmAlert.js';

export default class Login extends Component {
    
    state = {
        usernameLogin: '',
        passwordLogin: '',
        formValid: false,
        responseData: {
            account_id : 36
        },
        signUpResAccountId: 36
    }

    signUpData = {
        formElements: {
            firstname: {
                type: 'text',
                value: '',
                validator: {
                    required: true,
                    minLength: 5,
                    maxLength:15
                },
                touched: false,
                error:{status:true,message:''}
            },
            lastname: {
                type: 'text',
                value: '',
                validator: {
                    required: true,
                    minLength: 5,
                    maxLength:20
                },
                touched: false,
                error:{status:true,message:''}
            },
            email: {
                type: 'email',
                value: '',
                validator: {
                    required: true,
                    pattern:'email'
                },
                touched: false,
                error:{status:true,message:''}
            },
            password: {
                type: 'password',
                value: '',
                validator: {
                    required: true,
                    minLength: 8
                },
                touched: false,
                error:{status:true,message:''}
            }
        },
        formValid: false
    }

    signUpDataToBack = {
        username : this.signUpData.formElements.email.value,
        password : this.signUpData.formElements.password.value,
        coin_amount : 0,
        first_name : this.signUpData.formElements.firstname.value,
        last_name : this.signUpData.formElements.lastname.value,
        facebook : '#',
        instagram : '#',
        youtube : '#',
        email : this.signUpData.formElements.email.value,
        website : '#'
    }

    signInDataToBack = {
        username : this.state.usernameLogin,
        password : this.state.passwordLogin
    }
    

    onFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let updatedForm = { ...this.signUpData.formElements };
        updatedForm[name].value = value;
        updatedForm[name].touched = true;
        const validatorObject = this.checkValidator(value, updatedForm[name].validator);
        updatedForm[name].error = {
            status: validatorObject.status,
            message: validatorObject.message
        }
        let formStatus = true;
        for (let name in updatedForm) {
            if (updatedForm[name].validator.required === true) {
                formStatus = !updatedForm[name].error.status && formStatus;
                //console.log(formStatus)
            }
        }
        this.signUpData = {
            formElements: updatedForm,
            formValid : formStatus
        }
        this.setState({
            formValid: formStatus
        })
        //console.log(this.signUpData)
    }

    checkValidator = (value, rule) => {
        let valid = true;
        let message = '';
        if(value.trim().length === 0 && rule.required) {
            valid = false;
            message = 'จำเป็นต้องกรอก';

        }
        if(value.length < rule.minLength && valid) {
            valid = false;
            message = `น้อยกว่า ${rule.minLength} ตัวอักษร`;
        }
        if(value.length > rule.maxLength && valid) {
            valid = false;
            message = `มากกว่า ${rule.maxLength} ตัวอักษร`;
        }
        if (rule.pattern === 'email' && valid) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
                valid = false;
                message = 'กรอกอีเมลไม่ถูกต้อง';
            }
        }
        return { status:!valid, message:message };
    }
    
    getInputClass = (name) => {
        const elementErrorStatus = this.signUpData.formElements[name].error.status;
        let result='';
        if (this.signUpData.formElements[name].touched) {
            if (elementErrorStatus) {
                result = 'input-login form-control is-invalid';
            }
            else {
                result = 'input-login form-control is-valid';
            }
        }
        else {
            result ='input-login form-control';
        }
        return result;
    }

    getErrorMessage = (name) => {
        return this.signUpData.formElements[name].error.message;
    }

    onFormSubmit = (event) => {
        // const formData = {};
        // for (let name in this.signUpData.formElements) {
        //     formData[name] = this.signUpData.formElements[name].value;
        // }
        event.preventDefault();
        this.signUpDataToBack = {
            username : this.signUpData.formElements.email.value,
            password : this.signUpData.formElements.password.value,
            coin_amount : 100,
            first_name : this.signUpData.formElements.firstname.value,
            last_name : this.signUpData.formElements.lastname.value,
            facebook : '#',
            instagram : '#',
            youtube : '#',
            email : this.signUpData.formElements.email.value,
            website : '#'
        }
        //console.log(this.signUpDataToBack)
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("username", this.signUpDataToBack.username);
            urlencoded.append("password", this.signUpDataToBack.password);
            urlencoded.append("coin_amount", "100");
            urlencoded.append("first_name", this.signUpDataToBack.first_name);
            urlencoded.append("last_name", this.signUpDataToBack.last_name);
            urlencoded.append("facebook", "#");
            urlencoded.append("instagram", "#");
            urlencoded.append("youtube", "#");
            urlencoded.append("email", this.signUpDataToBack.email);
            urlencoded.append("website", "#");

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
            };
 
            fetch("https://tue-kan.herokuapp.com/account/", requestOptions)
            .then(response => response.int())
            .then(result => this.setState({ signUpResAccountId: result }))
            .catch(error => console.log('error', error));
 
        notifyAlert(() => { }, 'สำเร็จ!', 'ท่านได้ทำการสมัครสมาชิกแล้ว', 'success');
    }

    onInputChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
        //console.log(this.state);
    }
 
    onLoginSubmit = (event) => {
        event.preventDefault();

        //console.log('ก่อนส่ง');
        //console.log(this.state);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.state.usernameLogin);
        urlencoded.append("password", this.state.passwordLogin);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        fetch("https://tue-kan.herokuapp.com/auth/login", requestOptions)
            .then(response => response.json())
            .then(result => 
                this.setState({
                    responseData : result
                }, () => this.checkData(result)))
            .catch(error => console.log('error', error));
        console.log(this.state.responseData.account_id);
    }

    checkData (result) {
        //console.log('result here');
        //console.log(this.state.responseData.account_id);
        accountAccess().clearAccountId();
        let checkId = 36;
        if (this.state.responseData.account_id === undefined) {
            this.setState({
                ...this.state,
                passwordLogin : ''
            })
            AlertInCorrect();
        }
        else {
            accountAccess().setAccountId(this.state.responseData.account_id);
                console.log(checkId);
                console.log(accountAccess().getAccountId())
                AlertCorrect();
        }
    }

    render() {
        const signInButton = () => {
            const ele = document.querySelector('#container');
            ele.classList.remove('right-panel-active');
            // alert('hsigmnninsi')
        }
    
        const signUpButton = () => {
            const ele = document.querySelector('.container-login');
            ele.classList.add('right-panel-active');
            // alert('signup')
        }
        return (
            <div className ="loginpage">
                <div className="container-login" id="container">
                    <div className="form-container sign-up-container">
                        <form className="form-login" action="#" onSubmit={this.onFormSubmit}>
                            <h1 className="header1-login">Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className="span-login">or use your email for registration</span>
                            <input className={this.getInputClass('firstname')} type="text" placeholder="Firstname" id="firstname" name="firstname" onChange={this.onFormChange}/>
                            <div className="check invalid-feedback">{this.getErrorMessage('firstname')}</div>

                            <input className={this.getInputClass('lastname')} type="text" placeholder="Lastname" id="lastname" name="lastname" onChange={this.onFormChange}/>
                            <div className="check invalid-feedback">{this.getErrorMessage('lastname')}</div>

                            <input className={this.getInputClass('email')} type="email" placeholder="Email" id="email" name="email" onChange={this.onFormChange}/>
                            <div className="check invalid-feedback">{this.getErrorMessage('email')}</div>

                            <input className={this.getInputClass('password')} type="password" placeholder="Password" id="password" name="password" onChange={this.onFormChange}/>
                            <div className="check invalid-feedback">{this.getErrorMessage('password')}></div>
                        <   button className="button-login" type="submit" disabled={!this.state.formValid}>Sign Up</button>
                        </form>

                    </div>
                    <div className="form-container sign-in-container">
                        <form className="form-login" action="#" onSubmit = {this.onLoginSubmit}>
                            <h1 className="header1-login">Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className="span-login">or use your account</span>
                            <input className="input-login form-control" type="username" placeholder="Email" id="usernameLogin" name="usernameLogin" onChange={this.onInputChange} />
                            <input className="input-login form-control" type="password" placeholder="Password" id="passwordLogin" name="passwordLogin" value={this.state.passwordLogin} onChange={this.onInputChange} />
                            <a href="#" className="social">Forgot your password?</a>
                            <button className="button-login">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div id="signInContainer" className="overlay-panel overlay-left">
                                <h1 className="header1-login">Welcome Back!</h1>
                                <p className="p-login">To keep connected with us please login with your personal info</p>
                                <button className="button-login ghost" id="signIn" onClick={signInButton}>Sign In</button>
                            </div>
                            <div id="signUpContainer " className="overlay-panel overlay-right">
                                <div className='logobox'><img className='logo'src={logo}></img></div>
                                {/* <h1 className="header1-login">Tueกัน</h1> */}
                                {/* <p className="p-login">Enter your personal details and start journey with us</p> */}
                                <button className="button-login ghost signUp" id="signUp" onClick={signUpButton}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
