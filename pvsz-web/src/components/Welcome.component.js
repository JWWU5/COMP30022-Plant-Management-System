import React , { Component } from 'react';
import './Welcome.css';

export default class Welcome extends Component {
    render() {
        return (
            <main className='welcome'>
                <body>
                    <div className='titleDiv'>
                        <p className='welcomeText'>Welcome to</p> 
                        <p className='title'>P vs. Z</p>
                    </div>
                    <div>
                        <button className='signButton'>SIGN UP</button>
                        <button className='signButton'>SIGN IN</button>
                    </div>
                    <div>
                        <p className='aboutText'>If you wanna know more about this app, feel free 
                        to look into</p>
                        <a href='/about-us' className='linkText'>this page.</a>
                    </div>
                </body>
            </main>
            
        )
    }
}