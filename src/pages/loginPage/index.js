import React from 'react'
import './style.css'
// import styled from 'styled-components   '


// const signInContainer = styled.div`
// font-size: 1.5em;
// text-align: center;
// color: palevioletred;
// `;

export default function Login() {
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
        <div className="loginpage">
            <div className="container-login" id="container">
                <div className="form-container sign-up-container">
                    <form className="form-login" action="#">
                        <h1 className="header1-login">Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className="span-login">or use your email for registration</span>
                        <input className="input-login" type="text" placeholder="Name" />
                        <input className="input-login" type="email" placeholder="Email" />
                        <input className="input-login" type="password" placeholder="Password" />
                        <button className="button-login">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="form-login" action="#">
                        <h1 className="header1-login">Sign in</h1>
                        <div class="social-container">
                            <a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span className="span-login">or use your account</span>
                        <input className="input-login" type="email" placeholder="Email" />
                        <input className="input-login" type="password" placeholder="Password" />
                        <a href="#" class="social">Forgot your password?</a>
                        <button className="button-login">Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div id ="signInContainer" className="overlay-panel overlay-left">
                            <h1 className="header1-login">Welcome Back!</h1>
                            <p className="p-login">To keep connected with us please login with your personal info</p>
                            <button className="button-login ghost" id="signIn" onClick ={signInButton}>Sign In</button>
                        </div>
                        <div id ="signUpContainer "className="overlay-panel overlay-right">
                            <h1 className="header1-login">Hello, Friend!</h1>
                            <p className="p-login">Enter your personal details and start journey with us</p>
                                <button className="button-login ghost signUp" id="signUp" onClick={signUpButton}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
