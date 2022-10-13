import React from "react";
import "./Setting.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Setting() {
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

    return (
        <body>
            <Header />
            <div className="rankingContentDiv">
                <div className="rankingContentRec">
                    <h1 className="rankingTitle">Setting</h1>
                    <Grid container direction="column">
                        <div className="settingButtonDiv">
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <p>Darkmode</p>
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
                        <div className="settingButtonDiv">
                            <Grid container spacing={0}>
                                <Grid item xs={8}>
                                    <p>Cancel account</p>
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
                    </Grid>
                    {/* <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={deleteDoubleCheck}
                                    sx={{
                                        borderRadius: 25,
                                        color: "#646464",
                                        fontFamily: "Tamil HM",
                                        fontSize: 20,
                                    }}
                                >
                                    DELETE
                                </Button>
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                >
                                    <DialogTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
                                        {"Are you sure to delete this plant?"}
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button color="success" onClick={handleClose}>
                                            No
                                        </Button>
                                        <Button color="error" onClick={Agree}>
                                            yes!
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                    </ThemeProvider> */}
                </div>
            </div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <div className="logoutButton" onClick={handleLogout}>
                    <p>LOG OUT</p>
                </div>
            </Grid>
        </body>
    );
}
