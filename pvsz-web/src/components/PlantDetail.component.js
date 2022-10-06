import React from "react";
import "./PlantDetail.css";
import Header from './Header';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { Alert } from "@mui/material";

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
    const [isEditable, setIsEditable] = useState(false);
    const [buttonClass, setButtonClass] = useState("editButtonPlantDetail");
    const [buttonText, setbuttonText] = useState("Edit");
    const [detailBackgroundColor, setDetailBackgroundColor] = useState("#44533B");
    const [detailTextColor, setDetailTextColor] = useState("#555A6E");
    const [successTxt, setSuccessTxt] = useState("");

    useEffect(() => {
        setPlantId(searchParams[0].getAll("plantId")[0]);
    });

    useEffect(() => {
        axios
            .post(
                "/api/v1/customPlant/getPlant",
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
                if(plant.chooseGroup !== ""){
                    setPlantGroupName(plant.chooseGroup)
                } else{
                    setPlantGroupName("no group")
                }
                setLastSunDate(plant.lastSunDate)
                setLastWaterDate(plant.lastWaterDate)
                if (!isEditable){
                    setOtherDetails(plant.otherDetails)
                    setPlantImage(plant.image)
                    setPlantName(plant.name);
                }
            })
            .catch((err) => {
                console.log("err = ", err);
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
            setIsEditable(false);
            setDetailBackgroundColor("#788E6C");
            setDetailTextColor("#555A6E");
            setbuttonText("Edit");
            setButtonClass("editButtonPlantDetail");
        }
        axios
            .post(
                "/api/v1/customPlant/setCustomPlant",
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
                }
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    };

    const inputOtherDetails = (e) => {
        setOtherDetails(e.target.value);
    };

    const inputPlantName = (e) => {
        setPlantName(e.target.value);
    }

    return (
        <body>
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
            </div>
            <div className="detailContainer">
                <div className="imageDiv" style={{ backgroundImage: `url(${plantImage})` }}>
                    <Header />
                    <h3 className="plantNameTitle"><span>{plantName}</span></h3>
                    <input 
                        className="plantNameTextarea" 
                        value={plantName} 
                        disabled={!isEditable} 
                        onChange={(e) => inputPlantName(e)}
                    ></input>
                    {isEditable && <FileBase64
                            id="fileInput"
                            name="plantImage"
                            multiple={false}
                            onDone={({ base64 }) => setPlantImage(base64)}
                        />
                    }
                </div>
                <div className="detailContentDiv">
                    <h3 className="detailText">Details</h3>
                    <div className="detailTextRec">
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <p className="detailContentType">Group</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{plantGroupName}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">Last Sunlight</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{lastSunDate}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">Last Watering</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{lastWaterDate}</p>
                            </Grid>
                        </Grid>
                        <p className="otherDetailTitle">Other details</p>
                        <input 
                            className="otherDetailContent" 
                            style={{background: {detailBackgroundColor}, 
                                    color: {detailTextColor}}}
                            disabled={!isEditable}
                            type="text"
                            value = {otherDetails}
                            onChange={(e) => inputOtherDetails(e)}
                        >
                        {/* {otherDetails} */}
                        </input>
                        <button
                            className={buttonClass}
                            onClick={handleInput}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </body>
    )
}