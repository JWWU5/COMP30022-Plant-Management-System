import { useEffect, useRef, useState } from "react";
import backgroundMusic from "../assets/audio/bgM.mp3";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
const MusicPlayer = (currentPlaying) => {
    const [musicSrc, setMusicSrc] = useState(backgroundMusic);
    const audioRef = useRef();
    useEffect(() => {
        audioRef.current.load();
        audioRef.current.play();
        setMusicSrc(backgroundMusic);
    }, [currentPlaying]);

    return (
        <>
            <audio controls autoPlay ref={audioRef}>
                <source src={musicSrc} type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>
        </>
    );
};
export default MusicPlayer;
