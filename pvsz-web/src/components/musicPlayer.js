import { useEffect, useRef, useState } from "react";
import backgroundMusic from "../assets/audio/bgM.mp3";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import "./musicPlayer.css";
const MusicPlayer = (currentPlaying) => {
    const [bgmOn, setBgmOn] = useState(false);

    const handleBGM = () => {
        if (bgmOn) {
            setBgmOn(false);
        } else {
            setBgmOn(true);
        }
    };

    return (
        <>
            <nav className="volume">
                {bgmOn && (
                    <embed
                        src={backgroundMusic}
                        loop="true"
                        autostart="true"
                        hidden="true"
                    />
                )}
                {bgmOn && <VolumeUpIcon onClick={handleBGM} />}
                {!bgmOn && <VolumeMuteIcon onClick={handleBGM} />}
            </nav>
        </>
    );
};
export default MusicPlayer;
