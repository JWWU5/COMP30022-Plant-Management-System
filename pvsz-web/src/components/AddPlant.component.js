import { Grid } from '@mui/material';
import Header from './GreenHeader';
import avatar from "../assets/images/avatar.png";
import { useState } from "react";
import "./AddPlant.css";
import './dynamicButton.scss';

export default function AddPlant() {
    const [plantName, setPlantName] =useState("");
    const [waterRate, setWaterRate] = useState("");
    const [lastWaterTime, setLastWaterTime] = useState("");
    const [sunshineRate, setSunshineRate] = useState("");
    const [lastSunshineTime, setLastSunshineTime] = useState("");
    const [belongGroup, setBelongGroup] = useState("");
    const [otherDetail, setOtherDetail] = useState("");
    const [invalidInput, setInvalidInput] = useState(false);

    // function checkNumInput(inputvalue) {
    //     var pattern = /[0-9]/;
    //     var text = inputvalue.replace(" days", '');
    //     console.log(text);
    //     if (pattern.test(text) === false) {
    //         setInvalidInput(true);
    //     }
    //     else {
    //         setInvalidInput(false);
    //     }
    // };

    // const updateWaterRate = (e) => {
    //     checkNumInput(e.target.value);
    //     if (!invalidInput) {
    //         setWaterRate(e.target.value);
    //     }
    //     // console.log(waterRate);
    // };

    return (
        <body>
            <Header />
            <header>
                <h1 className='addPlantTitle'>ADD PLANT</h1>
            </header>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <img src={avatar} className='avatarIcon'></img>
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Plant Name</h3>
                    <input
                        className='plantValueBlock'
                        type="text"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                    ></input> 
                </div>
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Watering in (days)</h3>
                    <input
                        className='plantValueBlock'
                        type="number"
                        value={waterRate}
                        onChange={(e) => setWaterRate(e.target.value)}
                    ></input> 
                    <p></p>
                    { invalidInput && <span className="errorMessage">Sorry, we only accept interger here. </span> }
                </div>
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Last Watering Time</h3>
                    <input
                        className='plantValueBlock'
                        type="date"
                        value={lastWaterTime}
                        onChange={(e) => setLastWaterTime(e.target.value)}
                    ></input> 
                </div>
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Sublight in (days)</h3>
                    <input
                        type="number"
                        className='plantValueBlock'
                        value={sunshineRate}
                        onChange={(e) => setSunshineRate(e.target.value)}
                    ></input> 
                </div>
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Last Sublight</h3>
                    <input
                        className='plantValueBlock'
                        type="date"
                        value={lastSunshineTime}
                        onChange={(e) => setLastSunshineTime(e.target.value)}
                    ></input> 
                </div>
                {/* <div className='plantValueDiv'>
                    <label>Choose a group:</label>
                    <select className='palntValueBlock'>

                    </select>
                </div> */}
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Other details</h3>
                    <input
                        className='plantValueDetail'
                        type="text"
                        value={otherDetail}
                        onChange={(e) => setOtherDetail(e.target.value)}
                    ></input> 
                </div>
                <button className="submitButton">Submit</button>
            </Grid>
        </body>
    );
}
