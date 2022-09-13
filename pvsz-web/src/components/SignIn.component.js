import React, { Component } from "react";
import Header from "./Header";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";
import logo from "../assets/images/logo.jpg";
import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isCorrect, setIsCorrect] = useState("");
    const [information, setInformation] = useState("");

    const [email, setEmail] = useState("");
    const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        alert("Submited");

        // set configurations
        const configuration = {
            method: "post",
            url: "http://localhost:5000/api/v1/user/login",
            data: {
                userName,
                password,
            },
        };

        // make the API call
        axios(configuration)
            .then((result) => {
                // set the cookie
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                // redirect user to the auth page
                window.location.href = "/auth";

                setLogin(true);
            })
            .catch((error) => {
                error = new Error();
            });
    };

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
            setInformation("Invalid Email addredd.");
            setIsCorrect(false);  
        }
    };

    let navigate = useNavigate();

    function handleLogo() {
        navigate("/");
    }

    function handleText() {
        navigate("/about-us");
    }

    return (
        <body className="signIn">
            <Header />
            <header>
                <h1>Sign In</h1>
            </header> 
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <img src={avatar} className='avatarIcon'></img>
                <input
                    type="email"
                    placeholder="Email"
                    className="signInInputBlock"
                    value={email}
                    onChange={(e) => checkEmail(e.target.value)}
                >
                </input>
                {
                    !isCorrect && <span className="errorMessage">{information}</span>
                }
                <input
                    type="password"
                    placeholder="Password"
                    className="signInInputBlock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </input>
                <button
                    className="signInButton"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    SIGN IN
                </button>
                <img src={logo} className="logoImage" onClick={handleLogo}></img>
                <b className="infoText" onClick={handleText}>If you meet any issue when log in, feel free to contact OUR TEAM</b>
            </Grid>
        </body>
    );
}
