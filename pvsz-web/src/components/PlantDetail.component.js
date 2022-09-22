import React from "react";
import "./PlantDetail.css";
import Header from './Header';
import Grid from '@mui/material/Grid';
import Cactus from "../assets/images/Cactus.jpg";
import { useEffect, useState } from "react";
import likeIconImage from "../assets/images/like_on_icon.png";
import unlikeIconImage from "../assets/images/like_off_icon.png";

export default function PlantDetail() {

    // Below consts can be replaced with the content stored in database.  
    const plantName = "Cactus";
    const plantImage = Cactus;
    const plantGroupName = "Bedroom";
    const plantOtherDetail = "This pot of Cactus is a gift from my gf. "

    // The default usestate of plant liking could be gotten from our database. 
    const [likePlant, setLikePlant] = useState(false);
    const [likeIcon, setLikeIcon] = useState(unlikeIconImage);

    // Get last three sunlight times from backend. 
    const lastThreeSunlights = [
        {time: "2022 AUG 2"}, 
        {time: "2022 Jun 20"},
        {time: "2022 Jun 10"},  
    ];

    // Get last three watering times from backend. 
    const lastThreeWaterings = [
        {time: "2022 Jun 10"}, 
        {time: "2022 Jun 9"}, 
        {time: "2022 Jun 8"}, 
    ];

    // Loop the lastThreeSunlights list. 
    const getSunlightTime = lastThreeSunlights.map((lastThreeSunlight) =>
        <p className="detailContentText">{lastThreeSunlight.time}</p>
    );

    // Loop the lastThreeWaterings list. 
    const getWateringTime = lastThreeWaterings.map((lastThreeWatering) =>
        <p className="detailContentText">{lastThreeWatering.time}</p>
    );

    // This function is used to check if this plant is being select as like or unlike. 
    function changeLikeStatus() {
        if (likePlant) {
            setLikePlant(false);
            setLikeIcon(unlikeIconImage);
        }
        else {
            setLikePlant(true);
            setLikeIcon(likeIconImage);
        }
        // console.log(likePlant);
    }

    return (
        <body>
            <div className="detailContainer">
                <div className="imageDiv" style={{ backgroundImage: `url(${plantImage})` }}>
                    <Header />
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <h3 className="plantNameTitle"><span>{plantName}</span></h3>
                        </Grid>
                        <Grid item xs={6}>
                            <img src={likeIcon} className="likeIcon" onClick={changeLikeStatus}></img>
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
                                <p className="detailContentText">{plantGroupName}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">Last Three Sunlight</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{getSunlightTime}</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentType">Last Three Watering</p>
                            </Grid>
                            <Grid item xs={6}>
                                <p className="detailContentText">{getWateringTime}</p>
                            </Grid>
                        </Grid>
                        <p className="otherDetailTitle">Other details</p>
                        <p className="otherDetailContent">{plantOtherDetail}</p>
                    </div>
                </div>
            </div>
        </body>
    )
}