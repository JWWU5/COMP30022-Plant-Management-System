import React , { Component } from 'react';
import Header from './Header';
import './About.css';
import greenZombie from '../assets/images/green_zombie.png';

import { Grid } from '@mui/material';

export default class AboutUs extends Component {
    render() {
        return (
            <body className='about'>
                <Header />
                <main>
                    <div class="body">
                        <div class="aboutTitle">
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <h1 className='aboutTextPosition'>About </h1>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={6}>
                                            <h1>Us </h1>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <img class="titleImg" src={greenZombie}></img> 
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>    
                        </div> 
                        <div class="aboutRecContent">
                            <b>
                                <p>We aim to help our users track and take better
                                    care of their plants in home. 
                                </p>
                                <p className='spacingLine'></p>
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

