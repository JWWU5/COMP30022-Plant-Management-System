import React from 'react';
import './Welcome.css';
import './dynamicButton.scss';
import logo from "../assets/images/logo.jpg";
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {

    let navigate = useNavigate();
    
    function componentDidMount()
    {
        const container = document.querySelector('.buttonContainer1')
        container.addEventListener('animationend', () => {
            container.classList.remove('active');
        });
    }

    function handleSignIN() {
        navigate("/sign-in");
    }

    function handleSignUP() {
        navigate("/sign-up");
    }

    function handleAboutUS() {
        navigate("about-us");
    }

    return (
        <main className='welcome'>
            <p className='welcomeText'>Welcome to</p> 
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
                <div>
                    <img src={logo} className='logoStyle'></img>
                </div>
            
                <div>
                        <div className="buttonContainer1">
                            <span className="mas1"></span>
                            <button id='work' type="button" name="Hover" onClick={handleSignUP}>SIGN UP</button>
                        </div>
                    <div className="buttonContainer1">
                        <span className="mas1"></span>
                        <button id='work' type="button" name="Hover" onClick={handleSignIN}>SIGN IN</button>
                    </div>
                    
                </div>
                <div>
                    <ul>
                        <li className='aboutText' onClick={handleAboutUS}>If you wanna know more about this app, feel free 
                        to look into this page</li> 
                    </ul>
                </div>
            </Grid>
        </main>
    )
}