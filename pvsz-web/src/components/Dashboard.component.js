import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Dashboard.css";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Divider from "@mui/material/Divider";

import watercan from "../assets/images/water_can.png";
import sun from "../assets/images/sun.png";
import group from "../assets/images/group.png";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Dashboard() {
    let navigate = useNavigate();
    const [plantList, setPlantList] = useState([]);
    const [curFilter, setCurFilter] = useState("water");
    const [userName, setUserName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isbirthday, setisBirthday] = useState(false);
    const getList = () => {
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

                let { plantList, groups } = res.data.data;
                let deepPlantList = [...plantList];
                groups.forEach((element, index) => {
                    let plants = element.plants;
                    plants.forEach((plantsItem) => {
                        for (let i = deepPlantList.length - 1; i >= 0; i--) {
                            if (deepPlantList[i]._id == plantsItem._id) {
                                deepPlantList.splice(i, 1);
                            }
                        }
                    });
                });
                let needData = deepPlantList.concat(groups);
                for (let i = needData.length - 1; i >= 0; i--) {
                    let item = needData[i];
                    if (item.plants) {
                        for (let j = item.plants.length - 1; j >= 0; j--) {
                            let plantItem = item.plants[j];
                            if (curFilter == "sun") {
                                let sunPeriod = parseInt(plantItem.sunPeriod);
                                if (
                                    moment().diff(moment(plantItem.lastSunDate), "days") <=
                                    sunPeriod
                                ) {
                                    item.plants.splice(j, 1);
                                }
                            }
                            if (curFilter == "water") {
                                let waterPeriod = parseInt(plantItem.waterPeriod);
                                if (
                                    moment().diff(moment(plantItem.lastWaterDate), "days") <=
                                    waterPeriod
                                ) {
                                    item.plants.splice(j, 1);
                                }
                            }
                        }
                    } else {
                        if (curFilter == "sun") {
                            let sunPeriod = parseInt(item.sunPeriod);
                            if (
                                moment().diff(moment(item.lastSunDate), "days") <= sunPeriod
                            ) {
                                needData.splice(i, 1);
                            }
                        }

                        if (curFilter == "water") {
                            let waterPeriod = parseInt(item.waterPeriod);
                            if (
                                moment().diff(moment(item.lastWaterDate), "days") <= waterPeriod
                            ) {
                                needData.splice(i, 1);
                            }
                        }
                    }
                }
                setPlantList(needData);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    };
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
            ).then((res) => {
                setBirthday(res.data.birthday);
                const today1 = moment().format("YYYY-MM-DD");
                if (birthday == today1) {
                    setisBirthday(true)
                }
                setUserName(res.data.userName);

            }).catch((err) => {
                console.log("err = ", err);
            });
    },)
    useEffect(
        () => {
            getList();
        },
        [curFilter]
    );


    function handleAddIcon() {
        navigate("/select-plants");
    }

    const today = moment().format("YYYY/MM/DD");


    return (
        <body className="Dashboard">
            <Header />
            <main>
                <div class="welcome">
                    <h2>Welcome, {userName}</h2>
                    <h3>Today is {today}.</h3>
                    {isbirthday && <h3>Happy Birthday!</h3>}
                </div>
                <div class="topic">
                    <img
                        onClick={() => {
                            setCurFilter("water");
                        }}
                        class="watercan"
                        src={watercan}
                    />
                    <img
                        onClick={() => {
                            setCurFilter("sun");
                        }}
                        class="sun"
                        src={sun}
                    />
                    <AddCircleOutlineIcon onClick={handleAddIcon} />
                </div>
                <Button
                    onClick={() => {
                        console.log("plantlist = ", plantList);
                        let checkedArr = [];
                        for (let i = plantList.length - 1; i >= 0; i--) {
                            let item = plantList[i];
                            if (item.plants) {
                                for (let j = item.plants.length - 1; j >= 0; j--) {
                                    let plantItem = item.plants[j];
                                    if (plantItem.checked) {
                                        checkedArr.push(plantItem._id);
                                    }
                                }
                            } else {
                                if (item.checked) {
                                    checkedArr.push(item._id);
                                }
                            }
                        }
                        console.log("checkedArr = ", checkedArr)
                        axios.post(
                            "api/v1/customPlant/update",
                            {
                                idsArr: checkedArr,
                                type: curFilter,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${window.localStorage.token}`,
                                },
                            }
                        ).then(() => {
                            getList();
                        });
                    }}
                    variant="contained"
                >
                    update
                </Button>
                <div class="listbg">
                    <div class="list">
                        <Stack spacing={3} justify-Content="center">
                            {plantList.map((v, i) => {
                                if (v.groupname) {
                                    if (!v.plants.length) {
                                        return null;
                                    }
                                    return (
                                        <Accordion>
                                            <AccordionSummary
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <a>{v.groupname}</a>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Divider />
                                                {v.plants.map((plantItem, plantItemIndex) => {
                                                    return (
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
                                                            <Avatar src={plantItem.image} sx={{ ml: 2.5 }} />
                                                            <a>{plantItem.name}</a>
                                                            <Grid container justifyContent="flex-end">
                                                                <Checkbox
                                                                    {...label}
                                                                    onChange={(e) => {
                                                                        let deepList = [...plantList];
                                                                        deepList[i]["plants"][
                                                                            plantItemIndex
                                                                        ].checked = e.target.checked;
                                                                        setPlantList(deepList);
                                                                    }}
                                                                    sx={{
                                                                        color: "#44533B",
                                                                        "&.Mui-checked": {
                                                                            color: "#44533B",
                                                                        },
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Box>
                                                    );
                                                })}
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                                return (
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
                                        <Avatar src={v.image} sx={{ ml: 2.5 }} />
                                        <a>{v.name}</a>
                                        <Grid container justifyContent="flex-end">
                                            <Checkbox
                                                {...label}
                                                onChange={(e) => {
                                                    let deepList = [...plantList];
                                                    deepList[i].checked = e.target.checked;
                                                    setPlantList(deepList);
                                                }}
                                                sx={{
                                                    color: "#44533B",
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
