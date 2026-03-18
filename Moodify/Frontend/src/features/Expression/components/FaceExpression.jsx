// FaceExpression.jsx
import { useEffect, useRef, useState, useContext } from "react";
import { initFaceLandmarker, startCamera, detectExpression } from "../utils/utils.js";
import { useSong } from "../hooks/useSong";
import { SongContext } from "../song.context";
import Player from "./Player";
import "../styles/expression.scss";

const expressionToMood = {
  "😊 Smiling": "Happy",
  "😢 Sad":     "Sad",
  "😲 Surprise":"Excited",
  "😐 Neutral": "Neutral",
};

export default function FaceExpression() {
  const videoRef          = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const lastMoodRef       = useRef(null);
  const detectingRef      = useRef(false);

  const [expression,  setExpression]  = useState("Not detecting");
  const [detected,    setDetected]    = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const { loading, songs, handlegetSong } = useSong();

  const {
    activeSong,
    isPlaying,
    progress,
    current,
    duration,
    playSong,
    togglePlay,
    seekTo,
    nextSong,
    prevSong,
    setSongs,
  } = useContext(SongContext);

  useEffect(() => {
    initFaceLandmarker(faceLandmarkerRef, () => startCamera(videoRef));
  }, []);

  useEffect(() => {
    const mood = expressionToMood[expression];
    if (mood && mood !== lastMoodRef.current) {
      lastMoodRef.current  = mood;
      detectingRef.current = false;
      setDetected(true);
      setIsDetecting(false);
      handlegetSong({ mood });
    }
  }, [expression]);

  useEffect(() => {
    if (songs && songs.length > 0) {
      setSongs(songs);
      playSong(songs[0]);
    }
  }, [songs]);

  function handleDetect() {
    playSong(null);
    setDetected(false);
    lastMoodRef.current  = null;
    detectingRef.current = true;
    setIsDetecting(true);
    setExpression("Detecting...");
    detectExpression({ videoRef, faceLandmarkerRef, detectingRef, setExpression });
  }

  function handleSeekClick(e) {
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(ratio);
  }

  return (
    <div className="app-wrapper">

      {/* ══ SIDEBAR ══════════════════════════════ */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🎵</span>
          <span className="sidebar-logo-text">Moodify</span>
        </div>

        <p className="sidebar-section-label">Menu</p>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item active">
            <span className="sidebar-nav-icon">🏠</span> Home
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">📈</span> Trends
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">📚</span> Library
          </li>
        </ul>

        <p className="sidebar-section-label">Discovery</p>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">📅</span> Daily Weekly
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">🎯</span> Made For You
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">🎲</span> Daily Mix
          </li>
        </ul>

        <p className="sidebar-section-label">Your Collection</p>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">❤️</span> Liked Songs
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">⬇️</span> Your Download
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">🎤</span> Favorite Artist
          </li>
          <li className="sidebar-nav-item">
            <span className="sidebar-nav-icon">🎵</span> Playlist
          </li>
        </ul>

      </aside>

      {/* ══ MAIN CONTENT ════════════════════════ */}
      <main className="main-content">

        {/* Sticky top nav */}
        <div className="topnav">
          <div>
            <h1 className="topnav-title">Good Evening 👋</h1>
            <p className="topnav-subtitle">Let your face pick your playlist</p>
          </div>
          {detected && (
            <div id="mood-badge">
              🎭 {expressionToMood[expression] || expression} Mood
            </div>
          )}
        </div>

        <div className="content-pad">

          {/* Camera card */}
          <div className="camera-section">
            <div className="camera-video-wrap">
              {isDetecting && <div id="camera-live-badge">LIVE</div>}
              <video
                ref={videoRef}
                autoPlay playsInline muted
                className={detected ? "blurred" : ""}
              />
            </div>

            <div className="camera-info">
              <h2 className="camera-info-title">Face Mood Scanner</h2>
              <p className="camera-info-desc">
                Point your camera at your face. We will detect your expression
                and instantly build a playlist that matches how you feel right now.
              </p>
              <p className="expression-text">
                Expression: <span>{expression}</span>
              </p>
              <button id="detect-btn" onClick={handleDetect}>
                {detected ? "🔄 Scan Again" : "✨ Scan My Mood"}
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div id="loading-bar">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
              &nbsp;&nbsp;Finding songs for your mood…
            </div>
          )}

          {/* Song list */}
          {detected && <Player />}

        </div>
      </main>

      {/* ══ BOTTOM PLAYER BAR ═══════════════════ */}
      <div className="player-bar">

        {/* Left — now playing */}
        <div className="player-bar-left">
          {activeSong ? (
            <>
              <img
                className="player-bar-thumb"
                src={activeSong.posterUrl}
                alt={activeSong.title}
              />
              <div className="player-bar-track">
                <div className="player-bar-name">{activeSong.title}</div>
                <div className="player-bar-artist">{activeSong.artist}</div>
              </div>
              <span className="player-bar-heart">❤️</span>
            </>
          ) : (
            <div className="player-bar-track">
              <div className="player-bar-name" style={{ color: "#535353" }}>
                Nothing playing yet
              </div>
            </div>
          )}
        </div>

        {/* Center — controls + progress */}
        <div className="player-bar-center">
          <div className="player-controls">
            <button className="player-control-btn" onClick={prevSong} title="Previous">⏮</button>
            <button id="play-btn" onClick={togglePlay}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="player-control-btn" onClick={nextSong} title="Next">⏭</button>
          </div>

          <div className="player-progress-row">
            <span className="player-time">{current}</span>
            <div className="player-progress-track" onClick={handleSeekClick}>
              <div
                className="player-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="player-time right">{duration}</span>
          </div>
        </div>

        {/* Right — volume */}
        <div className="player-bar-right">
          <span className="player-volume-icon">🔊</span>
          <div className="player-volume-track">
            <div className="player-volume-fill" />
          </div>
        </div>

      </div>

    </div>
  );
}