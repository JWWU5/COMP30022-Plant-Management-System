import React, { Component } from "react";
import Header from "./Header";
import "./About.css";
import greenZombie from "../assets/images/green_zombie.png";

import { Grid } from "@mui/material";

export default class AboutUs extends Component {
    render() {
        return (
            <body className="about">
                <Header />
                <main>
                    <div class="body">
                        <div class="AboutUs">
                            <h2>About Us</h2>
                            <img class="greenZombie" src={greenZombie}></img>
                        </div>
                        <div class="aboutRecContent">
                            <b>
                                <p>
                                    We aim to offer our users a chance to be more easily and quickly to
                                    track and take care of their plants at home.
                                </p>
                                <p className="spacingLine"></p>
                                <p>
                                    From this website, you can group your plants,
                                    give them nicknames and record the watering,
                                    sunshine and other features.{" "}
                                </p>
                            </b>
                        </div>
                    </div>
                </main>
            </body>
        );
    }
}
