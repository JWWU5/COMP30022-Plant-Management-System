import React from "react";
import "./PlantDetail.css";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { Alert, inputAdornmentClasses } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export default function PlantDetail() {
    let searchParams = useSearchParams();

    const [plantId, setPlantId] = useState("");
    const [plant, setPlant] = useState([]);
    const [plantName, setPlantName] = useState("");
    const [plantGroupName, setPlantGroupName] = useState("");
    const [lastSunDate, setLastSunDate] = useState("");
    const [lastWaterDate, setLastWaterDate] = useState("");
    const [otherDetails, setOtherDetails] = useState("");
    const [plantImage, setPlantImage] = useState("");
    const [waterPeriod, setWaterPeriod] = useState("");
    const [sunshinePeriod, setSunshinePeriod] = useState("");

    // Variables for frontend.
    const [isEditable, setIsEditable] = useState(false);
    const [buttonClass, setButtonClass] = useState("editButtonPlantDetail");
    const [buttonText, setbuttonText] = useState("Edit");
    const [detailBackgroundColor, setDetailBackgroundColor] =
        useState("#44533B");
    const [detailTextColor, setDetailTextColor] = useState("#555A6E");
    const [errorTxt, setErrorTxt] = useState("");
    const [successTxt, setSuccessTxt] = useState("");
    const [liked, setLiked] = useState(false);
    const [validNameLength, setValidNameLength] = useState(true);

    useEffect(() => {
        setPlantId(searchParams[0].getAll("plantId")[0]);
    });

    useEffect(() => {
        axios
            .post(
                "api/v1/customPlant/getPlant",
                {
                    plantId: plantId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                setPlant(res.data.data);
                setPlantGroupName(res.data.group.join(", "));
                setLastSunDate(plant.lastSunDate);
                setLastWaterDate(plant.lastWaterDate);
                setWaterPeriod(plant.waterPeriod);
                setSunshinePeriod(plant.sunPeriod);
                if (!isEditable) {
                    setOtherDetails(plant.otherDetails);
                    setPlantImage(plant.image);
                    setPlantName(plant.name);
                    setLiked(res.data.data.like);
                }
            })
            .catch((err) => {
                console.log("err = ", err.response.data);
            });
        });


    function handleInput(e) {
        if (isEditable === false) {
            setIsEditable(true);
            setDetailBackgroundColor("#44533B");
            setDetailTextColor("#FFFFFF");
            setbuttonText("Submit");
            setButtonClass("submitButtonPlantDetail");
        } else {
            if (plantImage !== plant.image) {
                if (plantImage.slice(0, 10) !== "data:image") {
                    if (window.timer) {
                        clearTimeout(window.timer);
                    }
                    setErrorTxt("Only accept uploading image!");
                    window.timer = window.setTimeout(() => {
                        setErrorTxt("");
                    }, 1000);
                    return;
                }
            }
            if (!plantName) {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setErrorTxt("Plant name can't be empty!");
                window.timer = window.setTimeout(() => {
                    setErrorTxt("");
                }, 1000);
                return;
            }

            axios
                .post(
                    "api/v1/customPlant/setCustomPlant",
                    {
                        plantId: plantId,
                        otherDetails: otherDetails,
                        plantImage: plantImage,
                        plantName: plantName,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${window.localStorage.token}`,
                        },
                    }
                )
                .then((res) => {
                    if (isEditable === true) {
                        if (window.timer) {
                            clearTimeout(window.timer);
                        }
                        setSuccessTxt("Update is successful!");
                        window.timer = window.setTimeout(() => {
                            setSuccessTxt("");
                        }, 1000);
                        setIsEditable(false);
                        setDetailBackgroundColor("#788E6C");
                        setDetailTextColor("#555A6E");
                        setbuttonText("Edit");
                        setButtonClass("editButtonPlantDetail");
                    }
                })
                .catch((err) => {
                    console.log("err = ", err);
                });
        }
    }

    const inputOtherDetails = (e) => {
        setOtherDetails(e.target.value);
    };

    const inputPlantName = (e) => {
        setPlantName(e.target.value);
        checkNameLength(e.target.value);
    };

    function changeLiked() {
        axios.post(
            "api/v1/customPlant/changeLiked",

            {
                plantId: plantId,
                like: !liked,
            },
            {
                headers: {
                    Authorization: `Bearer ${window.localStorage.token}`,
                },
            }
        );
        setLiked(!liked);
    }

    function checkNameLength(inputValue) {
        if (inputValue.length > 12) {
            setValidNameLength(false);
            setButtonClass("editButtonPlantDetail");
        } else {
            setValidNameLength(true);
            setButtonClass("submitButtonPlantDetail");
        }
    }

    return (
        <body>
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <div className="detailContainer">
                <div
                    className="imageDiv"
                    style={{ backgroundImage: `url(${plantImage})` }}
                >
                    <Header />
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <h3 className="plantNameTitle">
                                <span>{plantName}</span>
                            </h3>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="likeIconDiv">
                                <Checkbox
                                    label="Like"
                                    color="error"
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    checked={liked}
                                    onChange={changeLiked}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="detailContentDiv">
                    <h3 className="detailText">Details</h3>
                    <div className="detailTextRec">
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <p className="detailContentType">Group</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">
                                    {plantGroupName}
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">
                                    Last Sunlight
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">
                                    {lastSunDate}
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">
                                    Last Watering
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">
                                    {lastWaterDate}
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">
                                    Watering Period
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">
                                    {waterPeriod} Days
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">
                                    Sunshine Period
                                </p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">
                                    {sunshinePeriod} Days
                                </p>
                            </Grid>
                        </Grid>
                        <p className="otherDetailTitle">Other details</p>
                        <textarea
                            className="otherDetailContent"
                            style={{
                                background: { detailBackgroundColor },
                                color: { detailTextColor },
                            }}
                            disabled={!isEditable}
                            type="text"
                            value={otherDetails}
                            onChange={(e) => inputOtherDetails(e)}
                        ></textarea>
                        {isEditable && (
                            <p className="otherDetailTitle">
                                Update the plant name
                            </p>
                        )}
                        {isEditable && (
                            <textarea
                                className="plantNameTextarea"
                                onChange={(e) => inputPlantName(e)}
                            >
                                {plantName}
                            </textarea>
                        )}
                        {isEditable && !validNameLength && (
                            <p className="unValidLengthMSG">
                                Maximum length of plant name is 12 characters
                            </p>
                        )}
                        {isEditable && (
                            <p className="otherDetailTitle">
                                Update the plant image
                            </p>
                        )}
                        {isEditable && (
                            <FileBase64
                                id="fileInput"
                                name="plantImage"
                                multiple={false}
                                onDone={({ base64 }) => setPlantImage(base64)}
                            />
                        )}
                        <button
                            className={buttonClass}
                            onClick={handleInput}
                            disabled={!validNameLength}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </body>
    );
}
