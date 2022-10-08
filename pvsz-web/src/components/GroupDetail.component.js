import React from "react";

import Header from "./Header";
import "./GroupDetail.css";
import "./PlantHome.css";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function GroupDetail() {
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    let searchParams = useSearchParams();
    const [open, setOpen] = React.useState(false);
    const [groupname, setgroupname] = useState("");
    const [plants, setPlants] = useState([]);
    const [groupId, setgroupId] = useState("");
    const [delGroup, setDelGroup] = useState([]);

    useEffect(() => {
        setgroupname(searchParams[0].getAll("groupname")[0]);
        setgroupId(searchParams[0].getAll("groupId")[0]);
    });

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
                setPlants(res.data.data.plants);
            })
            .catch((err) => {
                console.log("err = ", err.response.data);
            });
    });

    const deleteDoubleCheck = () => {
        setDelGroup([...delGroup, groupId]);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let navigate = useNavigate();

    function Agree() {

        axios
            .post(
                "api/v1/plantGroup/dels",

                delGroup.map((v) => {
                    return v;
                }),
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
                navigate("/groups");
                setSuccessTxt("Submit is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    window.location.reload(false);
                }, 1000);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    }

    const [state, setState] = React.useState({
        bottom: false,
    });
    // function toPlantDetail() {
    //     navigate("/plant-detail");
    // }

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
    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
                backgroundColor: "#BACB94",
            }}
        >
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem>
                        <ListItemButton
                        >
                            <ModeEditOutlineOutlinedIcon
                                sx={{ ml: 2, color: "#ffffff" }}
                            />
                            <ListItemText
                                primary="Edit group name"
                                sx={{ ml: 5, color: "#ffffff" }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate(`/group-plants?groupId=${groupId}`);
                            }}
                        >
                            <AddCircleOutlineIcon
                                sx={{ ml: 2, color: "#ffffff" }}
                            />
                            <ListItemText
                                primary="Add plants"
                                sx={{ ml: 5, color: "#ffffff" }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate(
                                    `/Delete-Group-Plants?groupId=${groupId}`
                                );
                            }}
                        >
                            <RemoveCircleOutlineIcon
                                sx={{ ml: 2, color: "#ffffff" }}
                            />
                            <ListItemText
                                primary="Delete plants"
                                sx={{ ml: 5, color: "#ffffff" }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={deleteDoubleCheck}>
                            <DeleteOutlineIcon
                                sx={{ ml: 2, color: "#ffffff" }}
                            />
                            <ListItemText
                                primary="Delete this group"
                                sx={{ ml: 5, color: "#ffffff" }}
                            />
                        </ListItemButton>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                        >
                            <DialogTitle
                                sx={{ fontWeight: "bold", fontSize: 20 }}
                            >
                                {"Are you sure to delete this group?"}
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
                    </ListItem>
                </List>
            </nav>
        </Box>
    );

    return (
        <body className="Dashboard">
            <Header />
            <main>
                <div class="groupName">
                    <h5>{groupname}</h5>
                    <Checkbox
                        {...label}
                        color="error"
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    />
                    <div class="editIcon">
                        {["bottom"].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <EditIcon
                                    onClick={toggleDrawer(anchor, true)}
                                    sx={{ color: "#44533B", width: 30 }}
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
                    </div>
                </div>
                <div class="bg">
                    <div class="plant">
                        <Stack spacing={3} justify-Content="center">
                            {plants.length === 0 && (
                                <div className="noData">
                                    no plants in this group
                                </div>
                            )}
                            {plants.map((v) => {
                                return (
                                    <Box
                                        key={v._id}
                                        display="flex"
                                        justify-Content="center"
                                        onClick={() => {}}
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
                                            <ArrowForwardIosOutlinedIcon
                                                onClick={() => {
                                                    navigate(
                                                        `/plant-detail?plantId=${v._id}`
                                                    );
                                                }}
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
