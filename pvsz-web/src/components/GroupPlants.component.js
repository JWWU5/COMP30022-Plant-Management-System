import React, { Component } from "react";
import Header from "./Header";
import "./delete.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import zombie_hand from "../assets/images/halloween.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
            width: 1,
            height: 55,
        },
    },
});

export default function GroupPlants() {
    let navigate = useNavigate();
    const [plantList, setPlantList] = useState([]);
    const [cachePlantList, setCachePlantList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");

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
                console.log("res = ", res.data.data);
                setPlantList(res.data.data.plantList);
                setCachePlantList(res.data.data.plantList);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }, []);

    function handleInput(e) {
        axios
            .post(
                "/api/v1/plantGroup/addGroupPlant",
                {
                    plants: groupList,
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
                setSuccessTxt("Update is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                }, 1000);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }

    function toGroupDetail() {
        navigate("/group-detail");
    }

    return (
        <body className="Dashboard">
            <Header />
            <main>
                <div class="bg">
                    <div class="topic">
                        <h2>Group</h2>
                        <img class="hand" src={zombie_hand}></img>
                    </div>
                    <h4>Your Plants</h4>

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
                                        placeholder="Search the plant"
                                        inputProps={{
                                            "aria-label": "search your plant",
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
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={toGroupDetail}
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
                                    RETURN
                                </Button>
                            </ThemeProvider>
                            <Divider />
                            {plantList && plantList.length == 0 && (
                                <div className="noData">no plant</div>
                            )}
                            {plantList.map((v) => {
                                return (
                                    <Box
                                        key={v._id}
                                        display="flex"
                                        justify-Content="center"
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
                                        <a>{v.name}</a>
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                        >
                                            <Checkbox
                                                {...label}
                                                sx={{
                                                    color: "#44533B",
                                                    mr: 1,
                                                    "&.Mui-checked": {
                                                        color: "#44533B",
                                                    },
                                                }}
                                                value={v}
                                                onChange={(e) =>
                                                    setGroupList((groupList) =>
                                                        groupList.concat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
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
