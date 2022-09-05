import React , { Component } from 'react';
import Header from "./Header";
import "./SignInUp.css";

export default class SignIn extends Component {
    render () {
        return (
            <body className='signIn'>
                <Header />
                <header>
                    <h1>Sign In</h1>
                </header>
            </body>
        )
    }
    
}
