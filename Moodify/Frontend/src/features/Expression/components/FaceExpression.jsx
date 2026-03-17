import { useEffect, useRef, useState, useContext } from "react";
import { initFaceLandmarker, startCamera, detectExpression } from "../utils/utils.js";
import { useSong } from "../hooks/useSong";
import { SongContext } from "../song.context";
import Player from "./Player";

const expressionToMood = {
    "😊 Smiling": "Happy",
    "😢 Sad": "Sad",
    "😲 Surprise": "Excited",
    "😐 Neutral": "Neutral",
};

export default function FaceExpression() {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const lastMoodRef = useRef(null);
    const detectingRef = useRef(false); // track loop state

    const [expression, setExpression] = useState("Not detecting");
    const [detected, setDetected] = useState(false); // true = show songs, blur camera

    const { loading, songs, handlegetSong } = useSong();
    const { songs: songList, setActiveSong } = useContext(SongContext);

    useEffect(() => {
        initFaceLandmarker(faceLandmarkerRef, () => startCamera(videoRef));
    }, []);

    useEffect(() => {
        const mood = expressionToMood[expression];
        if (mood && mood !== lastMoodRef.current) {
            lastMoodRef.current = mood;
            detectingRef.current = false; // stop the loop
            setDetected(true);            // blur camera, show songs
            handlegetSong({ mood });
        }
    }, [expression]);

    // autoplay first song when songs load
    useEffect(() => {
        if (songs && songs.length > 0) {
            setActiveSong(songs[0]);
        }
    }, [songs]);

    function handleDetect() {
        // reset everything
        setDetected(false);
        lastMoodRef.current = null;
        detectingRef.current = true;
        setExpression("Detecting...");

        detectExpression({
            videoRef,
            faceLandmarkerRef,
            detectingRef,       // pass ref not value
            setExpression
        });
    }

    return (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h2>AI Face Expression Detector</h2>

            {/* camera — blur when detected */}
            <video
                ref={videoRef}
                autoPlay playsInline muted width="640" height="480"
                style={{
                    border: "3px solid black",
                    borderRadius: "10px",
                    filter: detected ? "blur(6px)" : "none",  // blur after detection
                    transition: "filter 0.5s"
                }}
            />

            <h2 style={{ marginTop: "20px" }}>Expression: {expression}</h2>

            <button
                onClick={handleDetect}
                style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
            >
                {detected ? "Detect Again" : "Detect Expression"}
            </button>

            {loading && <p>Loading songs...</p>}
            {detected && <Player />}
        </div>
    );
}