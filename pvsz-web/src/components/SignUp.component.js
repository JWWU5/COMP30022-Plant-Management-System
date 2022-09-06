import React , { Component } from 'react';
import Header from "./Header";
import "./SignInUp.css";
import avatar from '../assets/images/avatar.png';

export default class SignUp extends Component {
    render () {
        return (
            <body className='signIn'>
                <Header />
                <header>
                    <h1>Sign Up</h1>
                </header>
                <div className='infoDiv'>
                    <img src={avatar}></img>
                    <ul>
                        <li><input type='text' placeholder='First Name' className='signUpInputBlock'></input></li> 
                        <li><input type='text' placeholder='Last Name' className='signUpInputBlock'></input></li>
                        <li><input type='text' placeholder='Username' className='signUpInputBlock'></input></li>
                        <li><input type='text' placeholder='DOB' className='signUpInputBlock'></input></li>
                        <li><input type='text' placeholder='Email' className='signUpInputBlock'></input></li>
                        <li><input type='text' placeholder='Password' className='signUpInputBlock'></input></li>
                        <li><button className='signUpButton'>SIGN UP</button></li>
                        <li>
                            <c>
                                <input type='checkbox' id='agreePolicy' name='agreePolicy'></input>
                                <label for="agreePolicy">By creating an account, you agree to our 
                                PRIVATE POLICY and TERMS AND CONDITIONS. </label>  
                            </c>
                        </li>
                    </ul>
                </div>
            </body>
        )
    }
    
}