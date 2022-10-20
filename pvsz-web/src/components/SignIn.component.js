import React, { Component } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";
import logo from "../assets/images/logo.jpg";
import { useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        green: {
            main: "#768457",
            width: 1,
            height: 60,
        },
    },
});

const cookies = new Cookies();
export default function Login() {
    const navigate = useNavigate();
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [email, setEmail] = useState("");
    const [isCorrect, setIsCorrect] = useState("");
    const [information, setInformation] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
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

        // set configurations
        const configuration = {
            method: "post",
            url: "api/v1/user/login",
            data: {
                email,
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
                window.localStorage.token = result.data.token;
                // redirect user to the auth page

                setLogin(true);

                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setSuccessTxt("Login is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    navigate("/dashboard");
                }, 1000);
            })
            .catch((error) => {
                // error = new Error();
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setErrorTxt(error?.response?.data?.message);
                window.timer = window.setTimeout(() => {
                    setErrorTxt("");
                }, 1000);
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
            setInformation("Oh-oh, this email address looks wrong. ");
            setIsCorrect(false);
        }
    };

    function handleLogo() {
        navigate("/");
    }

    function handleText() {
        navigate("/contact-us");
    }

    return (
        <body className="signIn">
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <header> 
                <Header />
            </header>
            <header>
                <h1>Sigh In</h1>
            </header>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <img src={avatar} className="avatarIcon"></img>
                
                    <input
                        type="email"
                        placeholder="Email"
                        className="signInInputBlock"
                        value={email}
                        onChange={(e) => checkEmail(e.target.value)}
                    ></input>
                    {!isCorrect && (
                        <span className="errorMessage">{information}</span>
                    )}
                <Stack spacing={3} justify-Content="center">
                    <input
                        type="password"
                        placeholder="Password"
                        className="signInInputBlock"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>

                    <ThemeProvider theme={theme}>
                        <Button 
                        variant="contained"
                        color="green"
                        onClick={(e) => handleSubmit(e)}
                        sx={{
                            height: 55,
                            borderRadius: 25,
                            color: "#ffffff",
                            textTransform: "capitalize",
                            fontFamily: "Times New Roman",
                            fontSize: 15,
                            fontWeight: "bold",
                        }}>SIGN IN</Button>
                    </ThemeProvider>
                </Stack>

                <img
                    src={logo}
                    className="logoImage"
                    onClick={handleLogo}
                ></img>
                <b className="infoText" onClick={handleText}>
                    If you meet any issue when log in, feel free to contact OUR
                    TEAM
                </b>
            </Grid>
            
        </body>
    );
}
