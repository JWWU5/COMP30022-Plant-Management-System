import React, { Component } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";
import { Alert } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [successTxt, setSuccessTxt] = useState("");
  const [errorTxt, setErrorTxt] = useState("");

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

    if (!agreePolicy) {
      if (window.timer) {
        clearTimeout(window.timer);
      }
      setErrorTxt("Please agree PRIVATE POLICY and TERMS AND CONDITIONS.");
      window.timer = window.setTimeout(() => {
        setErrorTxt("");
      }, 1000);
      return;
    }
    
    if (!(/\S+@\S+\.\S+/.test(email))) {
      if (window.timer) {
        clearTimeout(window.timer);
      }
      setErrorTxt("Incorrect email format");
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
        }, 1000);
        navigate('/sign-in');
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
  };

  const submit = (e) => {
    e.preventDefault();
    // console.log(input)
    alert(`The name you entered was: ${userName}`);
  };

  return (
    <body className="signIn">
      <div className="tipsBox">
        {successTxt && <Alert severity="success">{successTxt}</Alert>}
        {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
      </div>
      <Header />
      <header>
        <h1>Sign Up</h1>
      </header>
      <div className="infoDiv">
        <img src={avatar}></img>
        <ul>
          <form>
            <li>
              <input
                type="text"
                placeholder="First Name"
                className="signUpInputBlock"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                type="text"
                placeholder="Last Name"
                className="signUpInputBlock"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                type="username"
                placeholder="Username"
                className="signUpInputBlock"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                type="date"
                placeholder="DOB"
                className="signUpInputBlock"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                type="email"
                placeholder="Email"
                className="signUpInputBlock"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <input
                type="password"
                placeholder="Password"
                className="signUpInputBlock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </li>
            <li>
              <button className="signUpButton" onClick={(e) => handleSubmit(e)}>
                SIGN UP
              </button>
            </li>
            <li>
              <c>
                <input
                  type="checkbox"
                  id="agreePolicy"
                  name="agreePolicy"
                  value={agreePolicy}
                  onChange={(e) => {
                    // console.log("e = ", e)
                    setPagreePolicy(e.target.checked);
                  }}
                ></input>
                <label for="agreePolicy">
                  By creating an account, you agree to our PRIVATE POLICY and
                  TERMS AND CONDITIONS.{" "}
                </label>
              </c>
            </li>
          </form>
        </ul>
      </div>
    </body>
  );
}
