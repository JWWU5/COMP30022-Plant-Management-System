import React , { Component } from 'react';
import Header from "./Header";
import "./SignInUp.css";
import avatar from '../assets/images/avatar.png';

export default class SignIn extends Component {
    render () {
        return (
            <body className='signIn'>
                <Header />
                <header>
                    <h1>Sign In</h1>
                </header>
                <div className='infoDiv'>
                    <img src={avatar}></img>
                    <ul>
                        <li><input type='username' placeholder='Username' className='signInInputBlock'></input></li> 
                        <li><input type='password' placeholder='Password' className='signInInputBlock'></input></li>
                        <li><button className='signInButton' type='submit'>SIGN IN</button></li>
                    </ul>
                    <ul>
                        <li>
                            <b>If you meet any issue when log in, feel free to</b>
                            <b>contact OUR TEAM</b>
                        </li>
                    </ul>
                </div>
            </body>
        )
    }
    
}
