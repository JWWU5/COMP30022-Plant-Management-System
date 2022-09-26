import React, { Component, useEffect, useState } from "react";
import Header from "./Header";
import "./delete.css";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import zombie_hand from "../assets/images/halloween.svg";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function SelectPlant() {
    const [plantList, setPlantList] = useState([]);
    const [cachePlantList, setCachePlantList] = useState([]);

    useEffect(() => {
        axios
            .post(
                "http://localhost:5000/api/v1/plant/list",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                console.log("res = ", res.data.data);
                setPlantList(res.data.data);
                setCachePlantList(res.data.data);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }, []);

    let navigate = useNavigate();

    function CostomiseIcon() {
        navigate("/add-plant");
    }

    return (
        <body className="Dashboard">
            <Header />
            <main>
                <div class="bg">
                    <div class="topic">
                        <h2>Select</h2>
                        <img class="hand" src={zombie_hand}></img>
                    </div>
                    <h4>Your Plant</h4>

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
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search the plant"
                                        inputProps={{ "aria-label": "search your plant" }}
                                        onChange={(e) => {
                                            // console.log(e.target.value)
                                            let val = e.target.value;
                                            let deepList = [...cachePlantList];
                                            deepList = deepList.filter((v) => {
                                                return v.name.indexOf(val) !== -1;
                                            });
                                            setPlantList(deepList);
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
                                    onClick={CostomiseIcon}
                                    sx={{
                                        height: 50,
                                        borderRadius: 25,
                                        color: "#646464",
                                        textTransform: "capitalize",
                                        fontFamily: "Tamil HM",
                                        fontSize: 15,
                                    }}
                                >
                                    Customise new plant
                                </Button>
                            </ThemeProvider>
                            <Divider />
                            {plantList && plantList.length == 0 && (
                                <div
                                    style={{
                                        color: "#666",
                                        textAlign: "center",
                                    }}
                                    className="noData"
                                >
                                    no plant
                                </div>
                            )}
                            {plantList.map((v) => {
                                return (
                                    <Box
                                        display="flex"
                                        justify-Content="center"
                                        onClick={() => {
                                            // console.log("v = ", v)
                                            navigate(`/add-plant?sunExposure=${v.sunExposure}&waterPeriod=${v.waterPeriod}`);
                                        }}
                                        sx={{
                                            width: 1,
                                            height: 55,
                                            backgroundColor: "#ffffff",
                                            alignItems: "center",
                                            borderRadius: 25,
                                        }}
                                    >
                                        <Avatar src="avatar1.jpg" sx={{ ml: 2.5 }} />
                                        <a className="wordHidden" style={{
                                            flex: 1,
                                            fontSize: 14
                                        }}>{v.commonName}</a>
                                        <Grid justifyContent="flex-end">
                                            <ArrowForwardIosOutlinedIcon sx={{ mr: 2.5 }} />
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
