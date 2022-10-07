import React from "react";
import "./PlantDetail.css";
import Header from './Header';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FileBase64 from "react-file-base64";

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
    const [detailBackgroundColor, setDetailBackgroundColor] = useState("#44533B");
    const [detailTextColor, setDetailTextColor] = useState("#555A6E");

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
                // setPlantName(plant.name);
                if(plant.chooseGroup !== ""){
                    setPlantGroupName(plant.chooseGroup)
                } else{
                    setPlantGroupName("no group")
                }
                setLastSunDate(plant.lastSunDate)
                setLastWaterDate(plant.lastWaterDate)
                setOtherDetails(plant.otherDetails)
                // setPlantImage(plant.image)
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    });

    function handleInput() {
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
    };

    const inputOtherDetails = (e) => {
        setOtherDetails(e.target.value);
    };

    const inputPlantName = (e) => {
        setPlantName(e.target.value);
        console.log(plantName);
    }

    return (
        <body>
            <div className="detailContainer">
                <div className="imageDiv" style={{ backgroundImage: `url(${plantImage})` }}>
                    <Header />
                    <div className="plantNameTitleDiv">
                        <h3 className="plantNameTitle"><span>{plantName}</span></h3>
                    </div>
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
                            <Grid item xs={6}>
                                <p className="detailContentType">Watering Period</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{waterPeriod}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">Sunshine Period</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{sunshinePeriod}</p>
                            </Grid>
                        </Grid>
                        <p className="otherDetailTitle">Other details</p>
                        <textarea 
                            className="otherDetailContent" 
                            style={{background: {detailBackgroundColor}, 
                                    color: {detailTextColor}}}
                            disabled={!isEditable}
                            onChange={(e) => inputOtherDetails(e)}
                        >
                        {otherDetails}
                        </textarea>
                        { isEditable && <p className="otherDetailTitle">Update the plant name</p> }
                        { isEditable && <textarea className="plantNameTextarea" onChange={(e) => inputPlantName(e)}>{plantName}</textarea> }
                        { isEditable && <p className="otherDetailTitle">Update the plant image</p>}
                        { isEditable && <FileBase64
                                id="fileInput"
                                name="plantImage"
                                multiple={false}
                                onDone={({ base64 }) => setPlantImage(base64)}
                                />
                        }
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