import { Grid } from "@mui/material";
import Header from "./Header";
import "./Profile.css";
import "./dynamicButton.scss";
import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import Avatar from "@mui/material/Avatar";

export default function Profile() {
    const [buttonText, setbuttonText] = useState("Edit");
    const [readonlyValue, setReadonlyValue] = useState(true);
    const [inputType, setInputType] = useState("blocked");
    const [nullInput, setnullInput] = useState(false);
    const [errorTxt, setErrorTxt] = useState("");
    const [successTxt, setSuccessTxt] = useState("");
    // Below consts could be replaced by data stored in our database
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [buttonClass, setButtonClass] = useState("editButton");
    const [birthdayDate, setBirthdayDate] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        axios
            .post(
                "/api/v1/user/getUserInfo",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                setFirstName(res.data.data.firstName);
                setLastName(res.data.data.lastName);
                setUserName(res.data.data.userName);
                setBirthdayDate(res.data.data.dateOfBirth)
                setEmail(res.data.data.email)
                setImage(res.data.data.image)
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }, []);

    function checkNullInput(inputValue) {
        if (inputValue.trim().length - 1 === 0) {
            setnullInput(true);
            setButtonClass("editButton");
        } else {
            setnullInput(false);
            setButtonClass("submitButton");
        }
    }

    // Could save the input to our backend end in this function.
    function handleInput(e) {

        if (readonlyValue === true) {
            setReadonlyValue(false);
            setbuttonText("Submit");
            setInputType("text");
            setButtonClass("submitButton");

        } else {
            if (image.slice(0, 10) !== "data:image") {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setErrorTxt("Only accept uploading image");
                window.timer = window.setTimeout(() => {
                    setErrorTxt("");
                }, 1000);
                return;
            }
            axios
                .post(
                    "/api/v1/user/setUserInfo",
                    {
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName,
                        image: image,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.token}`,
                        },
                    }
                )
                .then((res) => {
                    if (readonlyValue === false) {
                        if (window.timer) {
                            clearTimeout(window.timer);
                        }
                        setSuccessTxt("Update is successful!");
                        window.timer = window.setTimeout(() => {
                            setSuccessTxt("");
                        }, 1000);
                        setReadonlyValue(true);
                        setbuttonText("Edit");
                        setInputType("blocked");
                        setButtonClass("editButton");
                    }
                })
                .catch((err) => {
                    console.log("err = ", err);
                });
        }
    }

    const inputFirstName = (e) => {
        setFirstName(e.target.value);
        checkNullInput(firstName);
    };

    const inputLastName = (e) => {
        setLastName(e.target.value);
        checkNullInput(lastName);
    };

    const inputUsername = (e) => {
        setUserName(e.target.value);
        checkNullInput(userName);
    };

    function uploadingImage(base64) {
        var count = 0;
        if (base64.slice(0, 10) === "data:image") {

            setImage(base64);
            if (count === 0) {
                count++;
            }
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setSuccessTxt("The selected file is a image!");
            window.timer = window.setTimeout(() => {
                setSuccessTxt("");
            }, 1000);
        } else {
            if (count === 0) {
                count++;
            }
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setSuccessTxt("Only accept uploading image");
            window.timer = window.setTimeout(() => {
                setSuccessTxt("");
            }, 1000);
        }
    }

    return (
        <body>
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <Header />
            <header>
                <h1 className="profileTitle">PROFILE</h1>
            </header>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar
                    src={image}
                    sx={{ width: 100, height: 100 }}
                />
                <div className="valueDiv">
                    <h3 className="valueTitle">First Name</h3>
                    <input
                        className="valueBlock"
                        type={inputType}
                        readOnly={readonlyValue}
                        value={firstName}
                        onChange={(e) => inputFirstName(e)}
                    ></input>
                </div>
                <div className="valueDiv">
                    <h3 className="valueTitle">Last Name</h3>
                    <input
                        className="valueBlock"
                        type={inputType}
                        readOnly={readonlyValue}
                        value={lastName}
                        onChange={(e) => inputLastName(e)}
                    ></input>
                </div>
                <div className="valueDiv">
                    <h3 className="valueTitle">UserName</h3>
                    <input
                        className="valueBlock"
                        type={inputType}
                        readOnly={readonlyValue}
                        value={userName}
                        onChange={(e) => inputUsername(e)}
                    ></input>
                </div>
                <div className="valueDiv">
                    <h3 className="valueTitle">Date of birth</h3>
                    <input
                        type="blocked"
                        className="valueBlock"
                        readOnly={true}
                        value={birthdayDate}
                    ></input>
                </div>
                <div className="valueDiv">
                    <h3 className="valueTitle">Email</h3>
                    <input
                        className="valueBlock"
                        type="blocked"
                        readOnly={true}
                        value={email}
                    ></input>
                </div>
                <div className="valueDiv">
                    {!readonlyValue && (
                        <h3 className="valueTitle">Upload new Avatar</h3>
                    )}
                    {!readonlyValue && (
                        <FileBase64
                            id="fileInput"
                            name="avatar"
                            multiple={false}
                            onDone={({ base64 }) => setImage(base64)}
                        />
                    )}
                </div>

                <button
                    className={buttonClass}
                    onClick={handleInput}
                    disabled={nullInput}
                >
                    {buttonText}
                </button>
            </Grid>
        </body>
    );
}
