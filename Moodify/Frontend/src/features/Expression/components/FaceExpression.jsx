// FaceExpression.jsx
import { useEffect, useRef, useState, useContext } from "react";
import { initFaceLandmarker, startCamera, detectExpression } from "../utils/utils.js";
import { useSong } from "../hooks/useSong";
import { SongContext } from "../song.context";
import Player from "./Player";
import "../styles/expression.scss";
import { Link } from "react-router-dom";

// ── Tutorial image imports (src/assets) ────────
import image1 from '../../../assets/image1.png'
import image2 from '../../../assets/image2.png'
import image3 from '../../../assets/image3.png'
import image4 from '../../../assets/image4.png'
import image5 from '../../../assets/image5.png'
import image6 from '../../../assets/image6.jpeg'


const expressionToMood = {
  "😊 Smiling": "Happy",
  "😢 Sad":     "Sad",
  "😲 Surprise":"Excited",
  "😐 Neutral": "Neutral",
};

const tutorialSlides = [
  {
    image: image1,
    step: 1,
    title: "Welcome to Moodify",
    desc: "Your face picks your playlist. Let us detect your mood and match it with the perfect songs.",
    color: "#7F77DD",
  },
  {
    image: image2,
    step: 2,
    title: "Allow Camera Access",
    desc: "When prompted, allow camera access so we can read your facial expression in real time.",
    color: "#1D9E75",
  },
  {
    image: image3,
    step: 3,
    title: "Point Your Face",
    desc: "Look directly at the camera with good lighting. Make sure your whole face is fully visible.",
    color: "#D85A30",
  },
  {
    image: image4,
    step: 4,
    title: "Tap 'Scan My Mood'",
    desc: "Hit the scan button and hold still for a moment while we detect your expression.",
    color: "#BA7517",
  },
  {
    image: image5,
    step: 5,
    title: "See Your Mood Badge",
    desc: "Your detected mood appears as a badge — Happy, Sad, Excited, or Neutral.",
    color: "#D4537E",
  },
  {
    image: image6,
    step: 6,
    title: "Enjoy Your Playlist",
    desc: "Songs matched to your mood load instantly. Use the player bar to play, skip, and vibe.",
    color: "#378ADD",
  },
];

export default function FaceExpression() {
  const videoRef          = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const lastMoodRef       = useRef(null);
  const detectingRef      = useRef(false);

  const [expression,    setExpression]    = useState("Not detecting");
  const [detected,      setDetected]      = useState(false);
  const [isDetecting,   setIsDetecting]   = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ── Tutorial state ───────────────────────────
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialIndex,  setTutorialIndex]  = useState(0);
  // ────────────────────────────────────────────

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

  // lock body scroll when tutorial is open
  useEffect(() => {
    document.body.style.overflow = isTutorialOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isTutorialOpen]);

  // ── Tutorial helpers ─────────────────────────
  function openTutorial() {
    setTutorialIndex(0);
    setIsTutorialOpen(true);
    setIsSidebarOpen(false);
  }
  function closeTutorial() {
    setIsTutorialOpen(false);
  }
  function handleNext() {
    if (tutorialIndex < tutorialSlides.length - 1) {
      setTutorialIndex(i => i + 1);
    } else {
      closeTutorial();
    }
  }
  function handlePrev() {
    if (tutorialIndex > 0) setTutorialIndex(i => i - 1);
  }
  // ────────────────────────────────────────────

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

  const activeSlide = tutorialSlides[tutorialIndex];

  return (
    <div className="app-wrapper">

      {/* ══ SIDEBAR OVERLAY ════════════════════ */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ══ SIDEBAR ══════════════════════════════ */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🎵</span>
          <span className="sidebar-logo-text">Moodify</span>
        </div>

        <p className="sidebar-section-label">Menu</p>
        <ul className="sidebar-nav">
          <li className="sidebar-nav-item active">
            <span className="sidebar-nav-icon">🏠</span> Home
          </li>
          {/* ── clicking Tutorial opens the modal ── */}
          <li className="sidebar-nav-item" onClick={openTutorial}>
            <span className="sidebar-nav-icon">📈</span> Tutorial
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
          <Link to="/about-developer" className="sidebar-nav-item about">
            <span className="sidebar-nav-icon">🎯</span>
            About Developer
          </Link>
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
          <div className="topnav-left">
            <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
            <div>
              <h1 className="topnav-title">Good Evening</h1>
              <p className="topnav-subtitle">Let your face pick your playlist</p>
            </div>
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

      {/* ══ TUTORIAL MODAL ══════════════════════ */}
      {isTutorialOpen && (
        <div className="tutorial-overlay" onClick={closeTutorial}>
          <div
            className="tutorial-modal"
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="tutorial-header">
              <span className="tutorial-label">How to use Moodify</span>
              <button
                className="tutorial-close-btn"
                onClick={closeTutorial}
                aria-label="Close tutorial"
              >
                ✕
              </button>
            </div>

            {/* ── Image slide ── */}
            <div className="tutorial-image-wrap">
              <img
                key={tutorialIndex}
                src={activeSlide.image}
                alt={`Tutorial step ${activeSlide.step}`}
                className="tutorial-slide-img"
              />

              {/* step counter badge */}
              <div
                className="tutorial-step-badge"
                style={{ background: activeSlide.color }}
              >
                {activeSlide.step} / {tutorialSlides.length}
              </div>

              {/* left arrow */}
              <button
                className="tutorial-arrow tutorial-arrow--left"
                onClick={handlePrev}
                disabled={tutorialIndex === 0}
                aria-label="Previous step"
              >
                ‹
              </button>

              {/* right arrow */}
              <button
                className="tutorial-arrow tutorial-arrow--right"
                onClick={handleNext}
                disabled={tutorialIndex === tutorialSlides.length - 1}
                aria-label="Next step"
              >
                ›
              </button>
            </div>

           

            {/* ── Dots ── */}
            <div className="tutorial-dots">
              {tutorialSlides.map((_, i) => (
                <button
                  key={i}
                  className={`tutorial-dot${i === tutorialIndex ? " active" : ""}`}
                  style={
                    i === tutorialIndex
                      ? { background: activeSlide.color, width: "22px" }
                      : {}
                  }
                  onClick={() => setTutorialIndex(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

           

          </div>
        </div>
      )}
      {/* ═══════════════════════════════════════ */}

    </div>
  );
}