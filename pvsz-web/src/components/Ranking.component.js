import React from "react";
import "./Ranking.css";
import Header from './Header';
import Grid from '@mui/material/Grid';

import plantIcon from "../assets/images/plantsIcon.png";

export default function Ranking() {
    // Referencing the plant icon on this page. 
    <a href="https://www.flaticon.com/free-icons/plant" title="plant icons">Plant icons created by Freepik - Flaticon</a>
    return (
       <body>
            <Header />
            <div className="rankingContentDiv">
                <h1 className="rankingTitle">RANKING</h1>
                <div className="rankingContentRec"></div>
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