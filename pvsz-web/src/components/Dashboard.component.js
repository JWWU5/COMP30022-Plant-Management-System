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
import { Alert } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FireExtinguisherOutlinedIcon from "@mui/icons-material/FireExtinguisherOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import backgroundMusic from "../assets/audio/bgM.mp3";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
            width: 1,
            height: 55,
        },
    },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Dashboard() {
    let navigate = useNavigate();
    const [plantList, setPlantList] = useState([]);
    const [curFilter, setCurFilter] = useState("water");
    const [waterLength, setwaterLength] = useState(0);
    const [sunLength, setsunLength] = useState(0);
    const [countplant, setcountplant] = useState(0);
    const [userName, setUserName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [isbirthday, setisBirthday] = useState(false);
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [bgmOn, setBgmOn] = useState(false);

    const handleBGM = () => {
        if (bgmOn) {
            setBgmOn(false);
        } else {
            setBgmOn(true);
        }
    };
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
                let count = 0;
                let { plantList, groups } = res.data.data;
                let deepPlantList = [...plantList];
                groups.forEach((element, index) => {
                    let plants = element.plants;
                    plants.forEach((plantsItem) => {
                        for (let i = deepPlantList.length - 1; i >= 0; i--) {
                            if (deepPlantList[i]._id === plantsItem._id) {
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
                            if (curFilter === "sun") {
                                let sunPeriod = parseInt(plantItem.sunPeriod);
                                if (
                                    moment().diff(
                                        moment(plantItem.lastSunDate),
                                        "days"
                                    ) <= sunPeriod
                                ) {
                                    item.plants.splice(j, 1);
                                }
                            }
                            if (curFilter === "water") {
                                let waterPeriod = parseInt(
                                    plantItem.waterPeriod
                                );
                                if (
                                    moment().diff(
                                        moment(plantItem.lastWaterDate),
                                        "days"
                                    ) <= waterPeriod
                                ) {
                                    item.plants.splice(j, 1);
                                }
                            }
                        }
                    } else {
                        if (curFilter === "sun") {
                            let sunPeriod = parseInt(item.sunPeriod);
                            if (
                                moment().diff(
                                    moment(item.lastSunDate),
                                    "days"
                                ) <= sunPeriod
                            ) {
                                needData.splice(i, 1);
                            }
                        }

                        if (curFilter === "water") {
                            let waterPeriod = parseInt(item.waterPeriod);
                            if (
                                moment().diff(
                                    moment(item.lastWaterDate),
                                    "days"
                                ) <= waterPeriod
                            ) {
                                needData.splice(i, 1);
                            }
                        }
                    }
                }
                setPlantList(needData);

                for (var each of needData) {
                    if (!each.name) {
                        count += each.plants.length;
                    } else {
                        count++;
                    }
                }
                if (curFilter === "water") {
                    setwaterLength(count);
                    setcountplant(count);
                    setsunLength(0);
                } else {
                    setsunLength(count);
                    setcountplant(count);
                    setwaterLength(0);
                }
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
            )
            .then((res) => {
                setBirthday(res.data.birthday);
                const today1 = moment().format("MM-DD");
                console.log(today1);
                if (moment(birthday).format("MM-DD") === today1) {
                    setisBirthday(true);
                }
                setUserName(res.data.userName);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    });
    useEffect(() => {
        getList();
    }, [curFilter]);

    function handleAddIcon() {
        navigate("/select-plants");
    }

    const today = moment().format("YYYY/MM/DD");

    const handleSubmit = () => {
        console.log(plantList);
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
        console.log("checkedArr = ", checkedArr);
        if (checkedArr.length === 0) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("Select at least one to update!");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        axios
            .post(
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
            )
            .then(() => {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setSuccessTxt("Update is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                }, 1000);
                getList();
            });
    };

    const translucentStyle = {
        opacity: 0.5,
    };

    const nontransparentStyle = {
        opacity: 1.0,
    };

    return (
        <body className="Dashboard">
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <Header />
            <main>
                <div class="welcome">
                    <h2>Welcome, {userName}</h2>
                    <h3>Today is {today}.</h3>
                    {isbirthday && <h3>Happy Birthday!</h3>}
                </div>
                <div class="switchIcons">
                    <div class="leftIcons">
                        <Badge badgeContent={waterLength} color="success">
                            {curFilter === "water" && (
                                <FireExtinguisherOutlinedIcon
                                    style={nontransparentStyle}
                                    onClick={() => {
                                        setCurFilter("water");
                                    }}
                                />
                            )}
                            {curFilter !== "water" && (
                                <FireExtinguisherOutlinedIcon
                                    style={translucentStyle}
                                    onClick={() => {
                                        setCurFilter("water");
                                    }}
                                />
                            )}
                        </Badge>
                        <Badge badgeContent={sunLength} color="success">
                            {curFilter === "sun" && (
                                <WbSunnyIcon
                                    style={nontransparentStyle}
                                    onClick={() => {
                                        setCurFilter("sun");
                                    }}
                                    sx={{ ml: 3 }}
                                />
                            )}
                            {curFilter !== "sun" && (
                                <WbSunnyIcon
                                    style={translucentStyle}
                                    onClick={() => {
                                        setCurFilter("sun");
                                    }}
                                    sx={{ ml: 3 }}
                                />
                            )}
                        </Badge>
                    </div>

                    <AddCircleOutlineIcon
                        onClick={handleAddIcon}
                        sx={{ ml: 5 }}
                    />
                </div>
                <div class="listbg">
                    <div class="list">
                        <Stack spacing={3} justify-Content="center">
                            {plantList.map((v, i) => {
                                if (v.groupname) {
                                    if (!v.plants.length) {
                                        return null;
                                    }
                                    if (v.like) {
                                        return (
                                            <Accordion>
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <a>{v.groupname}</a>
                                                    <FavoriteIcon
                                                        color="error"
                                                        sx={{
                                                            ml: 2,
                                                        }}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Divider />
                                                    {v.plants.map(
                                                        (
                                                            plantItem,
                                                            plantItemIndex
                                                        ) => {
                                                            return (
                                                                <Box
                                                                    display="flex"
                                                                    justify-Content="center"
                                                                    sx={{
                                                                        width: 1,
                                                                        height: 55,
                                                                        backgroundColor:
                                                                            "#ffffff",
                                                                        alignItems:
                                                                            "center",
                                                                        borderRadius: 25,
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        src={
                                                                            plantItem.image
                                                                        }
                                                                        sx={{
                                                                            ml: 2.5,
                                                                        }}
                                                                    />
                                                                    <a>
                                                                        {
                                                                            plantItem.name
                                                                        }
                                                                    </a>

                                                                    <Grid
                                                                        container
                                                                        justifyContent="flex-end"
                                                                    >
                                                                        <Checkbox
                                                                            {...label}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                let deepList =
                                                                                    [
                                                                                        ...plantList,
                                                                                    ];
                                                                                deepList[
                                                                                    i
                                                                                ][
                                                                                    "plants"
                                                                                ][
                                                                                    plantItemIndex
                                                                                ].checked =
                                                                                    e.target.checked;
                                                                                setPlantList(
                                                                                    deepList
                                                                                );
                                                                            }}
                                                                            sx={{
                                                                                color: "#44533B",
                                                                                "&.Mui-checked":
                                                                                    {
                                                                                        color: "#44533B",
                                                                                    },
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Box>
                                                            );
                                                        }
                                                    )}
                                                </AccordionDetails>
                                            </Accordion>
                                        );
                                    } else {
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
                                                    {v.plants.map(
                                                        (
                                                            plantItem,
                                                            plantItemIndex
                                                        ) => {
                                                            return (
                                                                <Box
                                                                    display="flex"
                                                                    justify-Content="center"
                                                                    sx={{
                                                                        width: 1,
                                                                        height: 55,
                                                                        backgroundColor:
                                                                            "#ffffff",
                                                                        alignItems:
                                                                            "center",
                                                                        borderRadius: 25,
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        src={
                                                                            plantItem.image
                                                                        }
                                                                        sx={{
                                                                            ml: 2.5,
                                                                        }}
                                                                    />
                                                                    <a>
                                                                        {
                                                                            plantItem.name
                                                                        }
                                                                    </a>

                                                                    <Grid
                                                                        container
                                                                        justifyContent="flex-end"
                                                                    >
                                                                        <Checkbox
                                                                            {...label}
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                let deepList =
                                                                                    [
                                                                                        ...plantList,
                                                                                    ];
                                                                                deepList[
                                                                                    i
                                                                                ][
                                                                                    "plants"
                                                                                ][
                                                                                    plantItemIndex
                                                                                ].checked =
                                                                                    e.target.checked;
                                                                                setPlantList(
                                                                                    deepList
                                                                                );
                                                                            }}
                                                                            sx={{
                                                                                color: "#44533B",
                                                                                "&.Mui-checked":
                                                                                    {
                                                                                        color: "#44533B",
                                                                                    },
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </Box>
                                                            );
                                                        }
                                                    )}
                                                </AccordionDetails>
                                            </Accordion>
                                        );
                                    }
                                }
                                if (v.like) {
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
                                            <Avatar
                                                src={v.image}
                                                sx={{ ml: 2.5 }}
                                            />
                                            <a>{v.name}</a>
                                            <FavoriteIcon
                                                color="error"
                                                sx={{
                                                    ml: 2,
                                                }}
                                            />
                                            <Grid
                                                container
                                                justifyContent="flex-end"
                                            >
                                                <Checkbox
                                                    {...label}
                                                    onChange={(e) => {
                                                        let deepList = [
                                                            ...plantList,
                                                        ];
                                                        deepList[i].checked =
                                                            e.target.checked;
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
                                } else {
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
                                                        let deepList = [
                                                            ...plantList,
                                                        ];
                                                        deepList[i].checked =
                                                            e.target.checked;
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
                                }
                            })}
                            {countplant !== 0 && (
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
                                        }}
                                    >
                                        UPDATE
                                    </Button>
                                </ThemeProvider>
                            )}
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    );
}
