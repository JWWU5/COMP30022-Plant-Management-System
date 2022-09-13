import React, { Component } from "react";
import Header from "./Header";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

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
    return (
        <body className="signIn">
            <Header />
            <header>
                <h1>Sign In</h1>
            </header>
            <div className="infoDiv">
                <img src={avatar}></img>
                <ul>
                    <li>
                        <input
                            type="username"
                            placeholder="Username"
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
