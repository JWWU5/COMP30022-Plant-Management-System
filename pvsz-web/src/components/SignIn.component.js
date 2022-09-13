import React, { Component } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";

const cookies = new Cookies();

export default function Login() {
  const navigate = useNavigate();
  const [successTxt, setSuccessTxt] = useState("");
  const [errorTxt, setErrorTxt] = useState("");

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    if (!userName) {
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
    // alert("Submited");
    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:5000/api/v1/user/login",
      data: {
        email: userName,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/dashboard",
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
          navigate("/");
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
  return (
    <body className="signIn">
      <div className="tipsBox">
        {successTxt && <Alert severity="success">{successTxt}</Alert>}
        {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
      </div>
      <Header />
      <header>
        <h1>Sign In</h1>
      </header>
      <div className="infoDiv">
        <img src={avatar}></img>
        <ul>
          <li>
            <input
              type="email"
              placeholder="Email"
              className="signInInputBlock"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              className="signInInputBlock"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button
              className="signInButton"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              SIGN IN
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <b>If you meet any issue when log in, feel free to</b>
            <b>contact OUR TEAM</b>
          </li>
        </ul>
      </div>
    </body>
  );
}
