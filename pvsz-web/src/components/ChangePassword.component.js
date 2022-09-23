import React, { useState } from "react";
import "./ChangePassword.css";
import Header from "./Header";

import { Grid } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {

    let navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [newPasswordType, setNewPasswordType] = useState("password");
    const [confirmationPasswordType, setConfirmationNewPasswordType] = useState("password");
    const [isNullPassword, setIsNullPassword] = useState(true);
    const [samePassword, setSamePassword] = useState(false);

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

    function handleSubmitNewPassword() {
        navigate("/dashboard");
    }

    const changePassword = (e) => {
        setNewPassword(e.target.value);
        if (newPassword.trim().length === 0) {
            setIsNullPassword(true);
        }
        else {
            setIsNullPassword(false);
        }
    }

    const changeConfirmPassword = (e) => {
        setConfirmationPassword(e.target.value);
        console.log(newPassword);
        console.log(confirmationPassword);
        if (confirmationPassword.localeCompare(newPassword) === 0) {
            setSamePassword(true);
        }
        else {
            setSamePassword(false);
        }
    }

    return (
        <body>
            <Header />
            <header>
                <h1 style={{color: "#44533B", fontSize: "3vh"}}>Change Password</h1>
            </header>
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <div className="changePasswordDiv">
                    <input 
                        className="newPasswordInput"
                        placeholder="New Password" 
                        value={newPassword} 
                        type={newPasswordType}
                        onChange={(e) => changePassword(e)}
                    ></input>
                    <VisibilityIcon className="visiableIcon" onClick={passwordVisiableCheck}/>
                </div>
                <div className="changePasswordDiv">
                    <input 
                        className="newPasswordInput"
                        placeholder="Confirm New Password" 
                        value={confirmationPassword} 
                        type={confirmationPasswordType}
                        onChange={(e) => changeConfirmPassword(e)}
                    ></input>
                    <VisibilityIcon className="visiableIcon" onClick={confirmPasswordVisiableCheck}/>
                </div>
                <div className="changePasswordDiv">
                    { (!isNullPassword && samePassword) && <button className="changePasswordButton" disabled={false} onClick={handleSubmitNewPassword}>Submit</button> }
                    { (isNullPassword || !samePassword) && <button className="invalidChangePasswordButton" disabled={true}>Submit</button> }
                </div>
             </Grid>
        </body>
    )
}