import React, { Component } from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../assets/icon/weblogo_white.png'
// import styled from 'styled-components   '


// const signInContainer = styled.div`
// font-size: 1.5em;
// text-align: center;
// color: palevioletred;
// `;

export default class Login extends Component {
    

    state = {
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
                    maxLength:15
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
        formValid: false,
        usernameLogin: '',
        passwordLogin:''
    }

    // state = {
    //         email: '',
    //         password:''
    // }

    onFormChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let updatedForm = { ...this.state.formElements };
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
            }
        }
        this.setState({
            ...this.state,
            formElements: updatedForm,
            formValid: formStatus
        });
        console.log(formStatus)
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
        const elementErrorStatus = this.state.formElements[name].error.status;
        let result = '';
        if (this.state.formElements[name].touched) {
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
        // return elementErrorStatus && this.state.formElements[name].touched ?
        //     'input-login form-control is-invalid':
        //     'input-login form-control is-valid';
    }
    getErrorMessage = (name) => {
        return this.state.formElements[name].error.message;
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        const formData = {};
        for (let name in this.state.formElements) {
            formData[name] = this.state.formElements[name].value;
        }
        console.log(formData);
    }


    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
    }

    onLoginSubmit = (event) => {
        event.preventDafault();
        console.log(this.state);
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
                <div className="container-login" id="container">
                    <div className="form-container sign-up-container">
                        <form className="form-login" action="#" onSubmit={this.onFormSubmit}>
                            <h1 className="header1-login">Create Account</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
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

                            <button className="button-login" type = "submit" disabled={!this.state.formValid}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className="form-login" action="#" onSubmit = {this.onLoginSubmit}>
                            <h1 className="header1-login">Sign in</h1>
                            <div className="social-container">
                                <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
                                <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                            <span className="span-login">or use your account</span>
                            <input className="input-login form-control" type="username" placeholder="Email" id="usernameLogin" name="usernameLogin" onChange={this.onInputChange} />
                            {/* <div className="check valid-feedback">พบชื่อผู้ใช้</div> */}
                            <input className="input-login form-control" type="passwordLogin" placeholder="Password" id="passwordLogin" name="passwordLogin" onChange={this.onInputChange} />
                            {/* <div className="check invalid-feedback">รหัสผ่านสั้นเกินไป</div> */}
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
        )
    }
}
