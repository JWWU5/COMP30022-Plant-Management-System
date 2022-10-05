import { Grid } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./AddPlant.css";
import "./dynamicButton.scss";
import FileBase64 from "react-file-base64";

import Select from "react-select";
import { useEffect } from "react";

export default function AddPlant() {
    const defaultImage = "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v112-pla-118-shopicons_2.jpg?bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&q=80&usm=15&vib=3&w=1300&s=ccfe8a4597928fe048abb6fd06f6a82e"
    let searchParams = useSearchParams();
    let navigate = useNavigate();
    const [successTxt, setSuccessTxt] = useState("");
    const [errorTxt, setErrorTxt] = useState("");
    const [plantName, setPlantName] = useState("");
    const [waterRate, setWaterRate] = useState("");
    const [lastWaterTime, setLastWaterTime] = useState("");
    const [sunshineRate, setSunshineRate] = useState("");
    const [lastSunshineTime, setLastSunshineTime] = useState("");
    const [otherDetail, setOtherDetail] = useState("");
    const [groups, setGroups] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [image, setImage] = useState("");

    useEffect(() => {
        axios
            .post(
                "/api/v1/user/getUserGroupInfo",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                const groupLength = res.data.data.groups.length;
                var groupOptions = new Array();
                for(var i = 0; i < groupLength; i++){
                    groupOptions[i] = { value: res.data.data.groups[i]._id, label: res.data.data.groups[i].groupname};
                }
                setGroupOptions(groupOptions);
                setImage(defaultImage);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
        let sunExposure = searchParams[0].getAll("sunExposure")[0];
        let waterPeriod = searchParams[0].getAll("waterPeriod")[0];
        if (sunExposure) {
            setWaterRate(waterPeriod);
        }
        if (waterPeriod) {
            setSunshineRate(sunExposure);
        }

    }, []);

    const handleSubmit = () => {
        if (!plantName) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("plantName cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (!waterRate) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("waterRate cannot be empty");
            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (!lastWaterTime) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("lastWaterTime cannot be empty");

            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (!sunshineRate) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("sunshineRate cannot be empty");

            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        if (!lastSunshineTime) {
            if (window.timer) {
                clearTimeout(window.timer);
            }
            setErrorTxt("lastSunshineTime cannot be empty");

            window.timer = window.setTimeout(() => {
                setErrorTxt("");
            }, 1000);
            return;
        }
        axios
            .post(
                "/api/v1/customPlant/add",
                {
                    image: image,
                    name: plantName,
                    waterPeriod: waterRate,
                    lastWaterDate: lastWaterTime,
                    sunPeriod: sunshineRate,
                    lastSunDate: lastSunshineTime,
                    otherDetails: otherDetail,
                    groups: groups,
                },
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.token}`,
                    },
                }
            )
            .then((res) => {
                if (window.timer) {
                    clearTimeout(window.timer);
                }
                setSuccessTxt("Submit is successful!");
                window.timer = window.setTimeout(() => {
                    setSuccessTxt("");
                    navigate("/plants");
                }, 1000);
            })
            .catch((err) => {
                console.log("err = ", err);
            });
    };

    return (
        <body>
            <div className="tipsBox">
                {successTxt && <Alert severity="success">{successTxt}</Alert>}
                {errorTxt && <Alert severity="error">{errorTxt}</Alert>}
            </div>
            <Header />
            <header>
                <h1 className="addPlantTitle">ADD PLANT</h1>
            </header>
            
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <div class="imageUpload">
                    <label for="fileInput">
                        <FileBase64
                            id="fileInput"
                            name="avatar"
                            multiple={false}
                            onDone={({ base64 }) => setImage(base64)}
                        />
                    </label>
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Plant Name</h3>
                    <input
                        className="plantValueBlock"
                        type="text"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                    ></input>
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Watering in (days)</h3>
                    <input
                        className="plantValueBlock"
                        type="text"
                        value={waterRate}
                        onChange={(e) => setWaterRate(e.target.value)}
                    ></input>
                    <p></p>
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Last Watering Time</h3>
                    <input
                        className="plantValueBlock"
                        type="date"
                        value={lastWaterTime}
                        onChange={(e) => setLastWaterTime(e.target.value)}
                    ></input>
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Sublight in (days)</h3>
                    <input
                        type="text"
                        className="plantValueBlock"
                        value={sunshineRate}
                        onChange={(e) => setSunshineRate(e.target.value)}
                    ></input>
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Last Sublight</h3>
                    <input
                        className="plantValueBlock"
                        type="date"
                        value={lastSunshineTime}
                        onChange={(e) => setLastSunshineTime(e.target.value)}
                    ></input>
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Choose a group: </h3>
                    <Select
                        isMulti
                        name="colors"
                        options={groupOptions}
                        className="basic-multi-select"
                        classNamePrefix="mySelect"
                        onChange={(e)=> setGroups(e.map(value=>value.value))}
                    />
                </div>
                <div className="plantValueDiv">
                    <h3 className="plantValueTitle">Other details</h3>
                    <input
                        className="plantValueDetail"
                        type="text"
                        value={otherDetail}
                        onChange={(e) => setOtherDetail(e.target.value)}
                    ></input>
                </div>
                <button onClick={handleSubmit} className="submitButton">
                    Submit
                </button>
            </Grid>
        </body>
    );
}
