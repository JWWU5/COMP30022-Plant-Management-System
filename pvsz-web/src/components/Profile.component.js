import { Grid } from '@mui/material';
import Header from './GreenHeader';
import avatar from "../assets/images/avatar.png";
import { useState } from "react";
import "./Profile.css";
import './dynamicButton.scss';

export default function Profile() {
    const [buttonText, setbuttonText] = useState("Edit");
    const [readonlyValue, setReadonlyValue] = useState(true);
    const [inputType, setInputType] = useState("blocked");

    const firstname = "Dave";
    const lastname = "Smith";
    const username = "Crazy_Dave";
    const birthdayDate = "01/01/2000";
    const email = "Crazy_Dave@gmail.com";

    function handleInput() {
        if (readonlyValue === true) {
            setReadonlyValue(false);
            setbuttonText("Submit");
            setInputType("text");
        }
        else {
            setReadonlyValue(true);
            setbuttonText("Edit");
            setInputType("blocked");
        }
    }

    return (
        <body>
            <Header />
            <header>
                <h1 className='profileTitle'>PROFILE</h1>
            </header>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <img src={avatar} className='avatarIcon'></img>
                <input
                    type={inputType}
                    className="signUpInputBlock"
                    readOnly={readonlyValue}
                    value={"First Name  " + firstname}
                ></input>
                <input
                    type={inputType}
                    className="signUpInputBlock"
                    readOnly={readonlyValue}
                    value={"Last Name   " + lastname}
                ></input>
                <input
                    type={inputType}
                    className="signUpInputBlock"
                    readOnly={readonlyValue}
                    value={"Username    " + username}
                ></input>
                <input
                    type={inputType}
                    className="signUpInputBlock"
                    readOnly="text"
                    value={"DOB            " + birthdayDate}
                ></input>
                <input
                    type={inputType}
                    className="signUpInputBlock"
                    readOnly="text"
                    value={"Email           " + email}
                ></input>
                <div className="buttonContainer2">
                    <span className="mas2"></span>
                    <button id='work' type="button" name="Hover" onClick={handleInput}>{buttonText}</button>
                </div>
            </Grid>
        </body>
    );     
}