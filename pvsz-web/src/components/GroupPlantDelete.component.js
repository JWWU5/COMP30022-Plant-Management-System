import React, { Component } from "react";
import Header from "./Header";
import "./delete.css";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import tomb from "../assets/images/tomb.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteGroup() {
    let searchParams = useSearchParams();
    const [open, setOpen] = React.useState(false);
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");

    const [plants, setPlants] = useState([]);
    const [groupId, setgroupId] = useState("");
    const [count, setCount] = useState(0);

    // get my userinfo by token
    useEffect(() => {
        setgroupId(searchParams[0].getAll("groupId")[0]);
        setCount(count + 1);
    }, []);

    useEffect(() => {
        axios
            .post(
                "/api/v1/plantGroup/getPlantGroupList",
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
                setPlants(res.data.data.plants);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }, [count]);
    const deleteDoubleCheck = () => {
        let checkedGroupArr = plants.filter((v) => {
            return v.checked;
        });

        if (!checkedGroupArr.length) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Please select at least one group!");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let navigate = useNavigate();

    function Agree() {
        let checkedGroupArr = plants.filter((v) => {
            return v.checked;
        });
        axios
            .post(
                "/api/v1/plantGroup/delPlantInGroup",
                {
                    idsArr: checkedGroupArr.map((v) => {
                        return v._id;
                    }),
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
                setSuccessTxt("Delete is successful!");
                setOpen(false);
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
                        <h2>Delete?</h2>
                        <img class="tomb" src={tomb}></img>
                    </div>
                    <div class="plant">
                        <Stack spacing={3} justify-Content="center">
                            <ThemeProvider theme={theme}>
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
                                    <DialogTitle
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: 20,
                                        }}
                                    >
                                        {"Are you sure to delete this group?"}
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button
                                            color="success"
                                            onClick={handleClose}
                                        >
                                            No
                                        </Button>
                                        <Button color="error" onClick={Agree}>
                                            Yes!
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </ThemeProvider>
                            <Divider />
                            {plants && plants.length == 0 && (
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
                            {plants.map((v, i) => {
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
                                                onChange={(e) => {
                                                    let deepList = [...plants];

                                                    deepList[i].checked =
                                                        e.target.checked;

                                                    setPlants(deepList);
                                                }}
                                                sx={{
                                                    color: "#44533B",
                                                    mr: 1,
                                                    "&.Mui-checked": {
                                                        color: "#44533B",
                                                    },
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
