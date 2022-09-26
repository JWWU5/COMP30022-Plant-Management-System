import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./SignInUp.css";
import "./dynamicButton.scss";
import avatar from "../assets/images/avatar.png";
import { Alert } from "@mui/material";
import { Grid } from "@mui/material";
import FileBase64 from "react-file-base64";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [isCorrect, setIsCorrect] = useState("");
    const [information, setInformation] = useState("");
    // const [buttonContent, setButtonContent] = useState("");
    // const [selectedImage, setSelectedImage] = useState(avatar);

    const [image, setImage] = useState(avatar);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [birthdayDate, setBirthdayDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreePolicy, setPagreePolicy] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("agreePolicy = ", agreePolicy);
        if (!firstName) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("First Name cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        if (!lastName) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Last Name cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        if (!userName) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Username cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        if (!birthdayDate) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("birthdayDate cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        if (!email) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Email cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        if (!password) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Password cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        // prevent the form from refreshing the whole page
        e.preventDefault();

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:5000/api/v1/user/register",
            data: {
                image,
                firstName,
                lastName,
                userName,
                birthdayDate,
                email,
                password,
            },
        };
        // make the API call
        axios(configuration)
            .then((result) => {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setSuccessTxt("Registration succeeded, please login!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    navigate("/sign-in");
                }, 1000);
            })
            .catch((error) => {
                console.log("error = ", error.response.data.message);
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setErrorTxt(error?.response?.data?.message);
                window.timer = window.setTimeout(() => {
                    setErrorTxt("");
                }, 1000);
                error = new Error();
            });
        console.log(configuration);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(input)
        alert(`The name you entered was: ${userName}`);
    };

    function componentDidMount() {
        const container = document.querySelector(".buttonContainer1");
        container.addEventListener("animationend", () => {
            container.classList.remove("active");
        });
    }

    const checkEmail = (value) => {
        //reg express
        setEmail(value);
        function isValidEmail(email) {
            return /\S+@\S+\.\S+/.test(email);
        }
        //if ture
        if (isValidEmail(value)) {
            setIsCorrect(true);
        }
        //if false
        else {
            setInformation("Oh-oh, this email address looks wrong. ");
            setIsCorrect(false);
        }
    };

    var avatarStyle = {
        height: "10vh",
        width: "10vh",
    };

    return (
        <body className="signIn">
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <Header />
            <header>
                <h1>SIGN UP</h1>
            </header>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <div class="image-upload">
                    <label for="file-input">
                        {/* <img alt="avatar" src={selectedImage} style={avatarStyle}></img>
                    {console.log(selectedImage)} */}
                        <FileBase64
                            id="file-input"
                            name="avatar"
                            multiple={false}
                            onDone={({ base64 }) => setImage(base64)}
                        />
                        {/* {console.log(image)} */}
                    </label>

                    {/* <input id="file-input" type="file" name="avatar" accept="image/png, image/jpeg, image/jpg" onChange={(e) => {
                    // if(e.target.files.length !== 0){
                        setSelectedImage({image: URL.createObjectURL(e.target.files[0])});
                    // }
                    // else {
                    //   setSelectedImage({image:URL.createObjectURL(e.target.files[0])});
                    // }
                    }}
                /> */}
                </div>
            </Grid>
            <form>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <input
                        type="text"
                        placeholder="First Name"
                        className="signUpInputBlock"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="signUpInputBlock"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></input>
                    <input
                        type="username"
                        placeholder="Username"
                        className="signUpInputBlock"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    ></input>
                    <input
                        type="date"
                        placeholder="DOB"
                        className="signUpInputBlock"
                        value={birthdayDate}
                        onChange={(e) => setBirthdayDate(e.target.value)}
                    ></input>
                    <input
                        type="email"
                        placeholder="Email"
                        className="signUpInputBlock"
                        value={email}
                        onChange={(e) => checkEmail(e.target.value)}
                    ></input>
                    {!isCorrect && (
                        <span className="errorMessage">{information}</span>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        className="signUpInputBlock"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <div className="buttonContainer1">
                        {agreePolicy && <span className="mas1"></span>}
                        {agreePolicy && (
                            <button
                                id="work"
                                type="button"
                                name="Hover"
                                onClick={(e) => handleSubmit(e)}
                                disabled={!agreePolicy}
                            >
                                SIGN UP
                            </button>
                        )}
                        {!agreePolicy && (
                            <button
                                className="disabledSignUpButton"
                                disabled={!agreePolicy}
                            >
                                Please agree the privacy policy
                            </button>
                        )}
                    </div>
                </Grid>
                <div className="policyText">
                    <input
                        type="checkbox"
                        id="agreePolicy"
                        name="agreePolicy"
                        value={agreePolicy}
                        onChange={(e) => {
                            // console.log("e = ", e)
                            setPagreePolicy(e.target.checked);
                            // checkAgreePolicy(e)
                        }}
                        className="largerCheckBox"
                    ></input>
                    <label for="agreePolicy">
                        By creating an account, you agree to our PRIVATE POLICY
                        and TERMS AND CONDITIONS.
                    </label>
                </div>
            </form>
        </body>
    );
}
