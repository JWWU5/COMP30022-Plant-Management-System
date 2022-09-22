import React from "react";
import "./Ranking.css";
import Header from './Header';
import Grid from '@mui/material/Grid';

import plantIcon from "../assets/images/plantsIcon.png";
import firstIcon from "../assets/images/1.png";
import secondIcon from "../assets/images/2.png";
import thirdIcon from "../assets/images/3.png";
import avatar from "../assets/images/avatar.png";

export default function Ranking() {

    const userAvatar = avatar;

    // This can be replaced by the top 5 users in our database. 
    const topFiveUser = [
        {name: "Crazy_Dave", days: 365}, 
        {name: "Grandma", days: 360}, 
        {name: "Amy_J", days: 359}, 
        {name: "White", days: 350}, 
        {name: "Tom", days: 348}, 
    ]

    // Referencing the plant icon on this page. 
    // <a href="https://www.flaticon.com/free-icons/plant" title="plant icons">Plant icons created by Freepik - Flaticon</a>

    return (
       <body>
            <Header />
            <div className="rankingContentDiv">
                <h1 className="rankingTitle">RANKING</h1>
                <div className="rankingContentRec">
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <img src={firstIcon} className="rankingIcon"></img>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={avatar} className="userAvatar"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="rankingContent1">{topFiveUser[0].name}</p>
                            <p className="rankingContent2">Hold on for {topFiveUser[0].days} days</p>
                        </Grid>
                        <div className="blankSpace"></div>
                        <Grid item xs={6}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <img src={secondIcon} className="rankingIcon"></img>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={avatar} className="userAvatar"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="rankingContent1">{topFiveUser[1].name}</p>
                            <p className="rankingContent2">Hold on for {topFiveUser[1].days} days</p>
                        </Grid>
                        <div className="blankSpace"></div>
                        <Grid item xs={6}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <img src={thirdIcon} className="rankingIcon"></img>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={avatar} className="userAvatar"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="rankingContent1">{topFiveUser[2].name}</p>
                            <p className="rankingContent2">Hold on for {topFiveUser[2].days} days</p>
                        </Grid>
                        <div className="blankSpace"></div>
                        <Grid item xs={6}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <h3 className="rankingNum">4</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={avatar} className="userAvatar"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="rankingContent1">{topFiveUser[3].name}</p>
                            <p className="rankingContent2">Hold on for {topFiveUser[3].days} days</p>
                        </Grid>
                        <div className="blankSpace"></div>
                        <Grid item xs={6}>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <h3 className="rankingNum">5</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={avatar} className="userAvatar"></img>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <p className="rankingContent1">{topFiveUser[4].name}</p>
                            <p className="rankingContent2">Hold on for {topFiveUser[4].days} days</p>
                        </Grid>
                        <div className="blankSpace"></div>
                    </Grid>
                </div>
            </div>
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={8}>
                        <p className="thanksMSG">Thank you for taking care of us</p>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={plantIcon} className="plantIcon"></img>
                    </Grid>
                </Grid>
                
            </div>
        </body> 
    )
    
}