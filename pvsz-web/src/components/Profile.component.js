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
    const [firstName, setFirstName] = useState("Dave");
    const [lastName, setLastName] = useState("Smith");
    const [userName, setUserName] = useState("Crazy_Dave");
    const [buttonClass, setButtonClass] = useState("editButton");

    const birthdayDate = "01/01/2000";
    const email = "Crazy_Dave@gmail.com";

    function handleInput(e) {
        if (readonlyValue === true) {
            setReadonlyValue(false);
            setbuttonText("Submit");
            setInputType("text");
            setButtonClass("submitButton");
        }
        else {
            setReadonlyValue(true);
            setbuttonText("Edit");
            setInputType("blocked");
            setButtonClass("editButton");
        }
    };

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
                <div className='valueDiv'>
                    <h3 className='valueTitle'>First Name</h3>
                    <input
                        className='valueBlock'
                        type={inputType}
                        readOnly={readonlyValue}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input> 
                </div>
                <div className='valueDiv'>
                    <h3 className='valueTitle'>Last Name</h3>
                    <input
                        className='valueBlock'
                        type={inputType}
                        readOnly={readonlyValue}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></input> 
                </div>
                <div className='valueDiv'>
                    <h3 className='valueTitle'>UserName</h3>
                    <input
                        className='valueBlock'
                        type={inputType}
                        readOnly={readonlyValue}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input> 
                </div>
                <div className='valueDiv'>
                    <h3 className='valueTitle'>Date of birth</h3>
                    <input
                        type="blocked"
                        className='valueBlock'
                        readOnly={true}
                        value={birthdayDate} 
                    ></input> 
                </div>
                <div className='valueDiv'>
                    <h3 className='valueTitle'>Email</h3>
                    <input
                        className='valueBlock'
                        type="blocked"
                        readOnly={true}
                        value={email}
                    ></input> 
                </div>
                <button className={buttonClass} onClick={handleInput}>{buttonText}</button>
            </Grid>
        </body>
    );     
}