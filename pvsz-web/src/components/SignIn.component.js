import React, { Component } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";
import logo from "../assets/images/logo.jpg";
import { useEffect, useState } from "react";
import { Grid } from '@mui/material';
import axios from "axios";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";
import './dynamicButton.scss';

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
      url: "http://localhost:5000/api/v1/user/login",
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
        // redirect user to the auth page
        // window.location.href = "/auth";

        // setLogin(true);

        if (window.timer) {
          clearTimeout(window.timer);
        }
        setSuccessTxt("Login is successful!");
        window.timer = window.setTimeout(() => {
          setSuccessTxt("");
          navigate("/dashboard");
        }, 1000);

        // navigate("/");
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

  function componentDidMount()
  {
    const container = document.querySelector('.buttonContainer')
    container.addEventListener('animationend', () => {
        container.classList.remove('active');
    });
  }

  return (
    <body className="signIn">
      <div className="tipsBox">
        {successTxt && <Alert severity="success">{successTxt}</Alert>}
        {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
      </div>
      <Header />
      <header>
        <h1>SIGN IN</h1>
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
          <div className="buttonContainer">
            <span className="mas"></span>
            <button id='work' type="button" name="Hover" onClick={(e) => handleSubmit(e)}>SIGN IN</button>
          </div>
        <img src={logo} className="logoImage" onClick={handleLogo}></img>
        <b className="infoText" onClick={handleText}>If you meet any issue when log in, feel free to contact OUR TEAM</b>
      </Grid>
    </body>
  );
}
