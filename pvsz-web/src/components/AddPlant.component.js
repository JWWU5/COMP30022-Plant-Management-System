import { Grid } from '@mui/material';
import Header from './GreenHeader';
import ImageUpload from '../assets/images/addPlantImage.svg';
import { useState } from "react";
import "./AddPlant.css";
import './dynamicButton.scss';

import Select from 'react-select';

export default function AddPlant() {
    const [plantName, setPlantName] =useState("");
    const [waterRate, setWaterRate] = useState("");
    const [lastWaterTime, setLastWaterTime] = useState("");
    const [sunshineRate, setSunshineRate] = useState("");
    const [lastSunshineTime, setLastSunshineTime] = useState("");
    const [belongGroup, setBelongGroup] = useState("");
    const [otherDetail, setOtherDetail] = useState("");
    const [selectedImage, setSelectedImage] = useState(ImageUpload);

    const groupOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    var imageStyle = {
        height: "10vh", 
        width: "10vh"
    };

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
                <div class="image-upload">
                    <label for="file-input">
                        <img alt="avatar" src={selectedImage} style={imageStyle}></img>
                        {console.log(selectedImage)}
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        name="plantImage"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => {
                            setSelectedImage({image: URL.createObjectURL(e.target.files[0])});
                        }}
                    />
                </div>
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
                <div className='plantValueDiv'>
                    <h3 className='plantValueTitle'>Choose a group: </h3>
                    <Select
                        isMulti
                        name="colors"
                        options={groupOptions}
                        className="basic-multi-select"
                        classNamePrefix="mySelect"
                    />
                </div>
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
