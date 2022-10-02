import React, { Component } from "react";

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
    let searchParams = useSearchParams();
    const [open, setOpen] = React.useState(false);
    const [groupname, setgroupname] = useState("");
    const [plants, setPlants] = useState("");

    useEffect(() => {
        setgroupname(searchParams[0].getAll("groupname")[0]);
        setPlants(searchParams[0].getAll("plants")[0]);
    }, []);
    const deleteDoubleCheck = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let navigate = useNavigate();

    function addPlants() {
        navigate("/group-plants");
    }

    function toGroupDetail() {
        navigate("/group-detail");
    }

    function Agree() {
        setOpen(false);
        navigate("/groups");
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
                        <ListItemButton onClick={addPlants}>
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
                        <ListItemButton>
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
                            {plants.length == 0 && (
                                <div className="noData">
                                    no plants in this group
                                </div>
                            )}
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    );
}
