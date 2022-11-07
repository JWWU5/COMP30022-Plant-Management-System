import React, { useState } from "react";
import "./ChangePassword.css";
import Header from "./Header";
import { Alert } from "@mui/material";
import { Grid } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
export default function ChangePassword() {

    let navigate = useNavigate();
    const cookies = new Cookies();
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [newPasswordType, setNewPasswordType] = useState("password");
    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordType, setOldPasswordType] = useState("password");
    const [confirmationPasswordType, setConfirmationNewPasswordType] = useState("password");


    function passwordVisiableCheck() {
        if (newPasswordType === "password") {
            setNewPasswordType("text");
        }
        else {
            setNewPasswordType("password");
        }
    }

    function confirmPasswordVisiableCheck() {
        if (confirmationPasswordType === "password") {
            setConfirmationNewPasswordType("text");
        }
        else {
            setConfirmationNewPasswordType("password");
        }
    }

    function oldPasswordVisiableCheck() {
        if (oldPasswordType === "password") {
            setOldPasswordType("text");
        }
        else {
            setOldPasswordType("password");
        }
    }

    function handleSubmitNewPassword() {
        if (!oldPassword) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Old password cannot be empty");

            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (!newPassword) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("New password cannot be empty");

            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (!confirmationPassword) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Confirmation password cannot be empty");

            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (confirmationPassword !== newPassword) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("two passwords are different");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (newPassword.length < 6) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Length of Password cannot be smaller than six");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        axios
            .post(
                "api/v1/user/changePassword",
                {
                    newPassword: newPassword,
                    oldPassword: oldPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                console.log("res = ", res.data);
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setSuccessTxt("Password has changed successfully!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    cookies.remove("TOKEN", { path: "/" });
                    navigate("/sign-in");
                }, 1000);
            })
            .catch((err) => {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setErrorTxt(err?.response?.data?.message);
                window.timer = window.setTimeout(() => {
                    setErrorTxt("");
                }, 1000);
            });
    }

    const changePassword = (e) => {
        setNewPassword(e.target.value);
    }

    return (
        <body>
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <Header />
            <header>
                <h1 style={{ color: "#44533B", fontSize: "3vh", textShadow: "3px 3px #FFFFFF" }}>Change Password</h1>
            </header>
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <div className="changePasswordDiv">
                    <input
                        className="newPasswordInput"
                        placeholder="Old Password"
                        value={oldPassword}
                        type={oldPasswordType}
                        onChange={(e) => setOldPassword(e.target.value)}
                    ></input>
                    <VisibilityIcon className="visiableIcon" onClick={oldPasswordVisiableCheck} />
                </div>
                <div className="changePasswordDiv">
                    <input
                        className="newPasswordInput"
                        placeholder="New Password"
                        value={newPassword}
                        type={newPasswordType}
                        onChange={(e) => changePassword(e)}
                    ></input>
                    <VisibilityIcon className="visiableIcon" onClick={passwordVisiableCheck} />
                </div>
                <div className="changePasswordDiv">
                    <input
                        className="newPasswordInput"
                        placeholder="Confirm New Password"
                        value={confirmationPassword}
                        type={confirmationPasswordType}
                        onChange={(e) => setConfirmationPassword(e.target.value)}
                    ></input>
                    <VisibilityIcon className="visiableIcon" onClick={confirmPasswordVisiableCheck} />
                </div>
                <div className="changePasswordDiv">
                    <button className="changePasswordButton" onClick={handleSubmitNewPassword}>Submit</button>
                </div>
            </Grid>
        </body>
    )
}