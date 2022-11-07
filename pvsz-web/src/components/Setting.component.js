import React from "react";
import "./Setting.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Cookies from "universal-cookie";
import { Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { borderLeft } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const cookies = new Cookies();

export default function Setting() {
    const [successTxt, setSuccessTxt] = useState("");
    const [openWindow, setOpenWindow] = React.useState(false);

    let navigate = useNavigate();

    function handleChangePassword() {
        navigate("/change-password");
    }

    function handlePrivatePolicy() {
        navigate("/private-policy");
    }

    function handleLogout() {
        cookies.remove("TOKEN", { path: "/" });
        navigate("/");
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
                width: 1,
                height: 55,
            },
        },
    });

    const logoutTheme = createTheme({
        palette: {
            primary: {
                main: "#44533B",
                width: 1,
                height: 55,
            },
        },
    });

    function handleOpenWindow() {
        setOpenWindow(true);
    }

    function closeOpenWindow() {
        setOpenWindow(false);
    }

    function cancelAccount() {
        setOpenWindow(false);
        axios
            .post(
                "api/v1/user/dels",
                {},
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
                setSuccessTxt("Account Has Been Deleted!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    cookies.remove("TOKEN", { path: "/" });
                    navigate("/");
                }, 1000);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }

    return (
        <body>
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
            </div>
            <Header />
            <div className="rankingContentDiv">
                <div className="rankingContentRec">
                    <h1 className="rankingTitle">Setting</h1>
                    <Grid container direction="column">
                        <div className="settingButtonDiv">
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <p>BGM</p>
                                </Grid>
                                <Grid item xs={6} alignContent="right">
                                    <div className="switchButton">
                                        <Switch defaultChecked size="small" />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="settingButtonDiv">
                            <Grid container spacing={0}>
                                <Grid item xs={8}>
                                    <p>Change Password</p>
                                </Grid>
                                <Grid item xs={4} alignContent="right">
                                    <div className="rightArrowIcon">
                                        <ChevronRightIcon
                                            onClick={handleChangePassword}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="settingButtonDiv">
                            <Grid container spacing={0}>
                                <Grid item xs={8}>
                                    <p>Provite Policy</p>
                                </Grid>
                                <Grid item xs={4} alignContent="right">
                                    <div className="rightArrowIcon">
                                        <ChevronRightIcon
                                            onClick={handlePrivatePolicy}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="cancelAccount">
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenWindow}
                                    sx={{
                                        width: 1,
                                        height: 1,
                                        borderRadius: 35,
                                        color: "#646464",
                                        fontFamily: "Tamil HM",
                                        fontSize: 20,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Delete Account
                                </Button>
                                <Dialog
                                    open={openWindow}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={closeOpenWindow}
                                >
                                    <DialogTitle
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: 20,
                                        }}
                                    >
                                        {"Delete this account?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Deleting this account means that all
                                            your personal details, plants and
                                            related information will be removed
                                            from our database permanently.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            color="success"
                                            onClick={closeOpenWindow}
                                        >
                                            No
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={cancelAccount}
                                        >
                                            yes!
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </ThemeProvider>
                        </div>
                    </Grid>
                </div>
            </div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <div className="logoutButton">
                    <ThemeProvider theme={logoutTheme}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogout}
                            sx={{
                                width: 1,
                                height: 1,
                                borderRadius: 25,
                                color: "#FFFFFF",
                                fontFamily: "New Times Roman",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            LOG OUT
                        </Button>
                    </ThemeProvider>
                </div>
            </Grid>
        </body>
    );
}
