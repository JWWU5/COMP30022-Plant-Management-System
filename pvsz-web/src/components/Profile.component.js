import { Grid } from "@mui/material";
import Header from "./Header";
import "./Profile.css";
import "./dynamicButton.scss";
import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";
import Avatar from "@mui/material/Avatar";
import background from "../assets/images/background.png";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        green: {
            main: "#788E6C",
            width: 1,
            height: 60,
        },
    },
});

var backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "150%",
    backgroundRepeat: "no-repeat",
};

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
    // const [buttonClass, setButtonClass] = useState("editButton");
    const [birthdayDate, setBirthdayDate] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        axios
            .post(
                "api/v1/user/getUserInfo",
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
        } else {
            setnullInput(false);
        }
    }

    // Could save the input to our backend end in this function.
    function handleInput(e) {

        if (readonlyValue === true) {
            setReadonlyValue(false);
            setbuttonText("Submit");
            setInputType("text");

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
            if (userName.length > 20) {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setErrorTxt("Length of Username cannot larger than 20!");
                window.timer = window.setTimeout(() => {
                    setErrorTxt("");
                }, 1000);
                return;
            }
            axios
                .post(
                    "api/v1/user/setUserInfo",
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
                <h1 className="profileTitle">Profile</h1>
            </header>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={backgroundStyle}
            >
                <Avatar
                    src={image}
                    sx={{ width: 80, height: 80 }}
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
                <div className="profileButtonDiv">
                    <ThemeProvider theme={theme}>
                        <Button
                            onClick={handleInput}
                            disabled={nullInput}
                            variant="contained"
                            color="green"
                            sx={{
                                width: 1,
                                height: 1,
                                borderRadius: 30,
                                color: "#ffffff",
                                textTransform: "capitalize",
                                fontFamily: "Times New Roman",
                                fontSize: 25,
                                fontWeight: "900",
                            }}
                        >
                            {buttonText}
                        </Button>
                    </ThemeProvider>
                </div>
            </Grid>
        </body>
    );
}
