import React , { Component } from 'react';
import Header from './Header';
import './About.css';
import greenZombie from '../assets/images/green_zombie.png';

export default class AboutUs extends Component {
    render() {
        return (
            <body className='about'>
                <Header />
                <main>
                    <div class="body">
                        <div class="title">
                            <h1>About Us</h1>
                            <img class="titleImg" src={greenZombie}></img>
                        </div> 
                        <div class="rectangleContent">
                            <b><p>We aim to help our users track and take better
                                care of their plants in home. 
                            </p>
                            <p>On this website, you can group your plants, 
                                give them nicknames and record the watering, 
                                sunshine and other features. </p>
                            </b>
                        </div>
                    </div>
                </main>
            </body>
        )
    }
}

