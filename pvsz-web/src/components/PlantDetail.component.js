import React from "react";
import "./PlantDetail.css";
import Header from './Header';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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
                setPlantName(plant.name);
                if(plant.chooseGroup !== ""){
                    setPlantGroupName(plant.chooseGroup)
                } else{
                    setPlantGroupName("no group")
                }
                setLastSunDate(plant.lastSunDate)
                setLastWaterDate(plant.lastWaterDate)
                setOtherDetails(plant.otherDetails)
                setPlantImage(plant.image)
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    });
    return (
        <body>
            <div className="detailContainer">
                
                <div className="imageDiv" style={{ backgroundImage: `url(${plantImage})` }}>
                    <Header />
                    <h3 className="plantNameTitle"><span>{plantName}</span></h3>
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
                        <p className="otherDetailContent">{otherDetails}</p>
                    </div>
                </div>
            </div>
        </body>
    )
}