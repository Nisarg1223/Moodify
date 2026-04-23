import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.scss';
import songSymbol from '../../../assets/song_symbol_glowing.png';
import emotionVertical from '../../../assets/music_emotion_vertical.png';
import ctaBackground from '../../../assets/cta_background_stars.png';
import headphone from '../../../assets/headphone.png'
const AboutPage = () => {
  return (
    <div className="about-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About Moodify</h1>
          <h2 className="hero-subtitle">Turn your emotions into music.</h2>
          <p className="hero-description">
         Moodify is a smart music experience that reads your facial expressions and plays songs that match your mood — instantly.
          </p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>About Moodify</span>
          </div>
        </div>
        <div className="hero-image">
          <img src={headphone} alt="Glowing Song Symbol" />
        </div>
      </section>

      {/* 2. IMAGE + “WHO WE ARE” SECTION */}
      <section className="who-we-are-section">
        <div className="who-image-container">
          <img src="https://i.pinimg.com/736x/8d/3d/37/8d3d37d3c9d7bc2e5cd83828e0f03f0a.jpg" alt="Music and Emotion" />
        </div>
        <div className="who-content">
          <span className="section-heading">Who We Are</span>
          <h2 className="main-title">A Smarter Way to Feel Music</h2>
          <p className="description">
            Moodify is designed to make music selection effortless. Instead of searching for songs manually, simply scan your facial expression and let our system detect your mood.
            <br /><br />
            Whether you're happy, sad, relaxed, or energetic — Moodify finds the perfect soundtrack for your moment.
          </p>
          <ul className="bullet-points">
            <li><span>✓</span> Real-time facial expression detection</li>
            <li><span>✓</span> AI-powered mood classification</li>
            <li><span>✓</span> Personalized song recommendations</li>
            <li><span>✓</span> Simple and interactive experience</li>
          </ul>
          <Link to="/" className="btn-primary">Try Mood Scan</Link>
        </div>
      </section>

      {/* 3. “HOW IT WORKS” */}
      <section className="how-it-works-section">
        <h2 className="section-title">How Moodify Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Make your facial expression</h3>
            <p>Show your natural emotion (smile, neutral, sad, etc.)</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Click “Scan Mood”</h3>
            <p>Our system analyzes your expression in real-time.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get your mood-based songs</h3>
            <p>Enjoy music that matches exactly how you feel.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Scan Again Anytime</h3>
            <p>Change your mood, discover new songs.</p>
          </div>
        </div>
        <p className="how-summary">
           Make your facial expression, click on "Scan Mood" or "Scan Again", and enjoy music that truly matches your feelings.
        </p>
      </section>

      {/* 4. STATS SECTION */}
      <section className="stats-section">
        <div className="stat-item">
          <h3>Real-Time</h3>
          <p>Mood Detection</p>
        </div>
        <div className="stat-item">
          <h3>Face-Based</h3>
          <p>Expression Analysis</p>
        </div>
        <div className="stat-item">
          <h3>Instant</h3>
          <p>Song Matching</p>
        </div>
        <div className="stat-item">
          <h3>Smooth</h3>
          <p>Music Experience</p>
        </div>
      </section>

      {/* 5. “ABOUT PROJECT / VISION” */}
      <section className="vision-section">
        <h2 className="section-title">Why Moodify?</h2>
        <p className="vision-content">
          Choosing the right music can be difficult when you don’t know what you feel. Moodify solves this by connecting emotions with sound.
          <br /><br />
          Our goal is to create a seamless connection between human feelings and digital music, making every listening experience more personal and meaningful.
        </p>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="cta-section" style={{ backgroundImage: `url(${ctaBackground})` }}>
        <div className="cta-overlay">
          <h2 className="cta-title">Let’s Feel the Music Together</h2>
          <p className="cta-subtitle">Discover songs that match your emotions in seconds.</p>
          <Link to="/" className="btn-primary cta-btn">Scan Your Mood Now</Link>
        </div>
      </section>

      {/* 7. FOOTER SHORT TEXT */}
      <footer className="about-footer">
        <p className="footer-desc">
          Moodify transforms your facial expressions into personalized playlists, matching music to your mood in real time.
        </p>
        <p className="footer-note">
          <small>Allow camera and sound access to scan your mood and enjoy music instantly.</small>
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;
