import React, { Component, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Alert } from "@mui/material";
import "./delete.css";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import tomb from "../assets/images/tomb.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

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

export default function DeletePlant() {
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [plantList, setPlantList] = useState([]);
    const [cachePlantList, setCachePlantList] = useState([]);

    // get my userinfo by token
    useEffect(() => {
        axios
            .post(
                "http://localhost:5000/api/v1/user/getUserinfo",
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

    const [open, setOpen] = React.useState(false);

    const deleteDoubleCheck = () => {
        let checkedPlantArr = plantList.filter((v) => {
            return v.checked;
        });
        if (!checkedPlantArr.length) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Please select at least one plant!");
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
        let checkedPlantArr = plantList.filter((v) => {
            return v.checked;
        });

        axios
            .post(
                "http://localhost:5000/api/v1/customPlant/dels",
                checkedPlantArr.map((v) => {
                    return v._id;
                }),
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
                setSuccessTxt("Delete is successful!");
                setOpen(false);
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    navigate("/plants");
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
                            <div class="search">
                                <Paper
                                    component="form"
                                    sx={{
                                        p: "2px 4px",
                                        display: "flex",
                                        alignItems: "center",
                                        width: 1,
                                        height: 55,
                                        borderRadius: 25,
                                    }}
                                >
                                    <b>Name</b>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search your plant"
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
                            {plantList.map((v, i) => {
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
                                        <Avatar src="avatar1.jpg" sx={{ ml: 2.5 }} />
                                        <a>{v.name}</a>
                                        <Grid container justifyContent="flex-end">
                                            <Checkbox
                                                {...label}
                                                onChange={(e) => {
                                                    // console.log("e = ", e.target.checked)
                                                    let deepList = [...plantList];
                                                    deepList[i].checked = e.target.checked;
                                                    setCachePlantList(deepList);
                                                    setPlantList(deepList);
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
                            {/* <Box
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
                <Avatar src="avatar.jpg" sx={{ ml: 2.5 }} />
                <a>Plant</a>
                <a2>Livingroom</a2>
                <Grid container justifyContent="flex-end">
                  <Checkbox
                    {...label}
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
              <Box
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
                <Avatar src="avatar1.jpg" sx={{ ml: 2.5 }} />
                <a>Plant</a>
                <Grid container justifyContent="flex-end">
                  <Checkbox
                    {...label}
                    sx={{
                      color: "#44533B",
                      mr: 1,
                      "&.Mui-checked": {
                        color: "#44533B",
                      },
                    }}
                  />
                </Grid>
              </Box> */}
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    );
}
