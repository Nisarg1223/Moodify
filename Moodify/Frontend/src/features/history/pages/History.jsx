import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistory } from '../hooks/useHistory';
import './History.scss';

const History = () => {
    const { history, loading, handleGetHistory } = useHistory();
    const navigate = useNavigate();

    useEffect(() => {
        handleGetHistory();
    }, []);

    if (loading) {
        return (
            <div className="history-loading">
                <div className="loader"></div>
            </div>
        );
    }

    const latestSongEntry = history && history.length > 0 ? history[0] : null;
    const latestSong = latestSongEntry ? latestSongEntry.song : null;

    const recentlyPlayed = history ? history.slice(1, 5) : [];
    const continueListening = history ? history.slice(5, 9) : []; // limit to a few

    return (
        <div className="history-page">
            {/* Top Navigation Bar */}
            <div className="top-nav">
                <div className="nav-controls">
                    <button className="icon-btn" onClick={() => navigate(-1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="icon-btn" onClick={() => navigate(1)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <div className="search-bar">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input type="text" placeholder="Search everything" />
                        <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                </div>
                <div className="nav-actions">
                    <button className="icon-btn">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </button>
                    <button className="icon-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                    <div className="profile-pic">
                        <img src="https://ui-avatars.com/api/?name=User&background=1f1f1f&color=fff" alt="Profile" />
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {history && history.length === 0 && (
                 <div className="empty-history">
                     <h2>No play history yet.</h2>
                     <p>Start listening to some music!</p>
                 </div>
            )}

            {/* Hero Section */}
            {latestSong && (
                <div className="hero-section" style={{ backgroundImage: `url(${latestSong.posterUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&h=800&fit=crop'})` }}>
                    <div className="hero-gradient"></div>
                    <div className="hero-content">
                        <p className="hero-supertitle">The</p>
                        <h1 className="hero-title">{latestSong.title?.toUpperCase() || 'UNKNOWN'}</h1>
                        
                        <div className="hero-meta">
                            <span className="rating"><span className="badge">Mood</span> {latestSong.mood || 'Vibe'}</span>
                            <span className="dot">•</span>
                            <span className="language">
                                🎵 {latestSong.artist || 'Unknown Artist'}
                            </span>
                        </div>

                        <div className="hero-actions">
                            <button className="watch-btn">
                                Listen
                            </button>
                            <div className="friends-watching">
                                <div className="avatars">
                                    <img src="https://i.pravatar.cc/100?img=11" alt="f1" />
                                    <img src="https://i.pravatar.cc/100?img=12" alt="f2" />
                                </div>
                                <span>+5 friends are listening</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-carousel">
                        {recentlyPlayed.slice(0, 3).map((item, index) => (
                            <div key={item._id} className="carousel-item">
                                <img src={item.song?.posterUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=120&fit=crop'} alt={item.song?.title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Horizontal Sections */}
            <div className="history-rows">
                {recentlyPlayed.length > 0 && (
                    <div className="history-section">
                        <div className="section-header">
                            <h2>Recently Played</h2>
                            <div className="indicator"></div>
                        </div>
                        <div className="cards-container">
                            {recentlyPlayed.map((item) => (
                                <div className="music-card" key={item._id}>
                                    <div className="card-image">
                                        <img src={item.song?.posterUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=200&fit=crop'} alt={item.song?.title} />
                                        <div className="avatars-small">
                                            <img src={`https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`} alt="a1" />
                                            <img src={`https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`} alt="a2" />
                                        </div>
                                    </div>
                                    <div className="card-info">
                                        <h3>{item.song?.title || 'Unknown Title'}</h3>
                                        <p>{item.song?.artist || 'Unknown Artist'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {continueListening.length > 0 && (
                    <div className="history-section">
                        <div className="section-header">
                            <h2>Continue Listening</h2>
                            <div className="indicator continue"></div>
                        </div>
                        <div className="cards-container">
                            {continueListening.map((item) => (
                                <div className="music-card continue-card" key={item._id}>
                                    <div className="card-image">
                                        <img src={item.song?.posterUrl || 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f543?w=300&h=200&fit=crop'} alt={item.song?.title} />
                                    </div>
                                    <div className="card-info">
                                        <h3>{item.song?.title || 'Unknown Title'}</h3>
                                        <p>{item.song?.artist || 'Unknown Artist'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;