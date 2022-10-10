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
import { Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import zombie_hand from "../assets/images/halloween.svg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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
    let searchParams = useSearchParams();
    let navigate = useNavigate();
    const [plantList, setPlantList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [groupPlants, setGroupPlants] = useState([]);
    const [groupId, setgroupId] = useState("");
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [difference, setDifference] = useState([]);
    const [cachePlantList, setCachePlantList] = useState([]);

    useEffect(() => {
        setgroupId(searchParams[0].getAll("groupId")[0]);
    }, []);
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
                setPlantList(res.data.data.plantList);
                setCachePlantList(res.data.data.plantList);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }, []);
    useEffect(() => {
        axios
            .post(
                "api/v1/plantGroup/getPlantGroupList",
                {
                    groupId: groupId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                setGroupPlants(res.data.data.plants);
            })
            .catch((err) => {
                console.log("er = ", err.response.data);
            });
    }, [groupId]);

    useEffect(() => {
        let difference = plantList.filter(
            (x) => !groupPlants.find((rm) => rm._id === x._id)
        );
        setDifference(difference);
    }, [difference]);

    function addPlantToGroup() {
        let checkedArr = groupList.filter((v) => {
            return v.checked;
        });
        if (!checkedArr.length) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Please select at least one plant!");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }

        axios
            .post(
                "api/v1/plantGroup/addPlantToGroup",
                {
                    plants: checkedArr,
                    groupId: groupId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setSuccessTxt("Update is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    navigate("/groups");
                }, 1000);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }

    return (
        <body className="Dashboard">
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
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
                                        placeholder="Search your plant"
                                        inputProps={{
                                            "aria-label": "search your plant",
                                        }}
                                        onChange={(e) => {
                                            let val =
                                                e.target.value.toUpperCase();
                                            let deepList = [...cachePlantList];
                                            deepList = deepList.filter((v) => {
                                                return (
                                                    v.name
                                                        .toUpperCase()
                                                        .indexOf(val) !== -1
                                                );
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
                                    onClick={addPlantToGroup}
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
                                    ADD
                                </Button>
                            </ThemeProvider>
                            <Divider />
                            {difference && difference.length == 0 && (
                                <div className="noData">
                                    no plants can be added
                                </div>
                            )}
                            {difference.map((v, i) => {
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
                                            src={v.image}
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
                                                value={v._id}
                                                onChange={(e) => {
                                                    let deepList = [
                                                        ...difference,
                                                    ];
                                                    deepList[i].checked =
                                                        e.target.checked;
                                                    setGroupList(deepList);
                                                }}
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
