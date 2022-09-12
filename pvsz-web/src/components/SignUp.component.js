import React, { Component } from "react";
import Header from "./Header";
import "./SignInUp.css";
import avatar from "../assets/images/avatar.png";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [birthdayDate, setBirthdayDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreePolicy, setPagreePolicy] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
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
                setRegister(true);
            })
            .catch((error) => {
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
                                onChange={(e) =>
                                    setBirthdayDate(e.target.value)
                                }
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
                            <button
                                className="signUpButton"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            >
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
                                    onChange={(e) =>
                                        setPagreePolicy(e.target.value)
                                    }
                                ></input>
                                <label for="agreePolicy">
                                    By creating an account, you agree to our
                                    PRIVATE POLICY and TERMS AND CONDITIONS.{" "}
                                </label>
                            </c>
                        </li>
                    </form>
                </ul>
            </div>
        </body>
    );
}
