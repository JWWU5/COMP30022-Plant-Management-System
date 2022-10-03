import React, { Component } from "react";

import Header from "./Header";
import "./PlantHome.css";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
            width: 1,
            height: 55,
        },
    },
});

export default function GroupHome() {
    const [groupName, setGroupName] = useState("");
    const [groups, setGroups] = useState([]);
    const [cacheGroupName, setCacheGroupName] = useState([]);
    let navigate = useNavigate();
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    // get my userinfo by token
    useEffect(() => {
        axios
            .post(
                "/api/v1/user/getUserGroupInfo",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                console.log("res = ", res.data.data);
                setGroups(res.data.data.groups);
                setCacheGroupName(res.data.data.groups);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }, []);

    function handleDeleteIcon() {
        navigate("/delete-groups");
    }

    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleSubmit = () => {
        if (!groupName) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("GroupName cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        axios
            .post(
                "api/v1/plantGroup/add",
                {
                    groupname: groupName,
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
                setSuccessTxt("Submit is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    window.location.reload(false);
                }, 1000);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    };
    console.log(groups);
    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
                backgroundColor: "#BACB94",
            }}
        >
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <div class="createNewGroup">
                <Stack spacing={5} justify-Content="center">
                    <div className="newGroupName">
                        <h3 className="newGroupNameTitle">Group Name</h3>
                        <input
                            className="plantValueBlock"
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>

                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{
                                height: 50,
                                borderRadius: 25,
                                color: "#646464",
                                textTransform: "capitalize",
                                fontFamily: "Tamil HM",
                                fontSize: 15,
                                fontWeight: "bold",
                            }}
                        >
                            CREATE
                        </Button>
                    </ThemeProvider>
                </Stack>
            </div>
        </Box>
    );

    return (
        <body className="Dashboard">
            <Header />
            <main>
                <div class="bg">
                    <div class="topic">
                        <h1>Groups</h1>
                        <div class="icons">
                            {["bottom"].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <AddCircleOutlineIcon
                                        onClick={toggleDrawer(anchor, true)}
                                        sx={{ color: "#ffffff", width: 30 }}
                                    />
                                    <SwipeableDrawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                        onOpen={toggleDrawer(anchor, true)}
                                    >
                                        {list(anchor)}
                                    </SwipeableDrawer>
                                </React.Fragment>
                            ))}
                            <RemoveCircleOutlineIcon
                                sx={{ color: "#ffffff", width: 30 }}
                                onClick={handleDeleteIcon}
                            />
                        </div>
                    </div>

                    <div class="plant">
                        <Stack spacing={3} justify-Content="center">
                            <div class="search">
                                <Paper
                                    component="form"
                                    sx={{
                                        p: "2px 4px",
                                        display: "flex",
                                        alignItems: "center",
                                        width: 1,
                                        height: 50,
                                        borderRadius: 25,
                                    }}
                                >
                                    <b>Name</b>
                                    <Divider
                                        sx={{ height: 28, m: 0.5 }}
                                        orientation="vertical"
                                    />
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search the group"
                                        inputProps={{
                                            "aria-label": "search the group",
                                        }}
                                        onChange={(e) => {
                                            // console.log(e.target.value)
                                            let val = e.target.value;
                                            let deepList = [...cacheGroupName];
                                            deepList = deepList.filter((v) => {
                                                return (
                                                    v.groupname.indexOf(val) !==
                                                    -1
                                                );
                                            });
                                            setGroups(deepList);
                                        }}
                                    />

                                    <IconButton
                                        type="button"
                                        sx={{ p: "10px" }}
                                        aria-label="search"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <Divider />
                            {groups && groups.length == 0 && (
                                <div className="noData">no group</div>
                            )}
                            {groups.map((v) => {
                                return (
                                    <Box
                                        key={v._id}
                                        display="flex"
                                        justify-Content="center"
                                        onClick={() => {
                                            navigate(
                                                `/group-detail?groupId=${v._id}&groupname=${v.groupname}&plants=${v.plants}`
                                            );
                                        }}
                                        sx={{
                                            width: 1,
                                            height: 55,
                                            backgroundColor: "#ffffff",
                                            alignItems: "center",
                                            borderRadius: 25,
                                        }}
                                    >
                                        <Avatar
                                            src="avatar1.jpg"
                                            sx={{ ml: 2.5 }}
                                        />
                                        <a>{v.groupname}</a>
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                        >
                                            <ArrowForwardIosOutlinedIcon
                                                sx={{ mr: 2.5 }}
                                            />
                                        </Grid>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    );
}
