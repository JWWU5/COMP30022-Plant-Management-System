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
                        <a href='/sign-up'>
                            <button className='signButton'>SIGN UP</button>
                        </a>
                        <a href='sign-in'>
                            <button className='signButton'>SIGN IN</button> 
                        </a>
                        
                    </div>
                    <div>
                        <ul>
                           <li className='aboutText'>If you wanna know more about this app, feel free 
                            to look into</li> 
                           <li><a href='/about-us' className='aboutLink'>this page.</a></li> 
                        </ul>
                    </div>
                </body>
            </main>
            
        )
    }
}