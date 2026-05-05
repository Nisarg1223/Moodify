import { useState } from "react";
import '../styles/uploadSong.scss'
import { uploadSong } from "../services/songService";

const UploadSong = () => {
    const [form, setForm] = useState({
        title: "",
        artist: "",
        mood: "Normal",
        releaseDate: ""
    });

    const [songFile, setSongFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);
    const [songDragging, setSongDragging] = useState(false);
    const [posterDragging, setPosterDragging] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", form.title);
        data.append("artist", form.artist);
        data.append("mood", form.mood);
        data.append("releaseDate", form.releaseDate);
        data.append("song", songFile);
        data.append("poster", posterFile);

        try {
            const res = await uploadSong(data);
            alert("✅ Song Uploaded!");
            console.log(res);
        } catch (err) {
            console.error(err);
            alert("❌ Upload failed");
        }
    };

    const handlePosterChange = (file) => {
        setPosterFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPosterPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const moodOptions = [
        { value: "Normal",  emoji: "😐", color: "#a0a0b0" },
        { value: "Happy",   emoji: "😄", color: "#f5c518" },
        { value: "Sad",     emoji: "😢", color: "#5b9bd5" },
        { value: "Excited", emoji: "🤩", color: "#ff4d9d" },
        { value: "Jolly",   emoji: "🎉", color: "#7b61ff" },
    ];

    return (
        <div className="upload-page">
            {/* Background ambient orbs */}
            <div className="upload-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>

            <div className="upload-container">
                {/* Header */}
                <div className="upload-header">
                    <div className="upload-header__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="upload-header__title">Upload Track</h1>
                        <p className="upload-header__subtitle">Share your music with the world</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="form-grid">

                        {/* LEFT COLUMN — Drop zones */}
                        <div className="form-col form-col--left">

                            {/* Song File Drop Zone */}
                            <label
                                className={`dropzone dropzone--audio${songDragging ? " dropzone--active" : ""}${songFile ? " dropzone--filled" : ""}`}
                                onDragOver={(e) => { e.preventDefault(); setSongDragging(true); }}
                                onDragLeave={() => setSongDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setSongDragging(false); setSongFile(e.dataTransfer.files[0]); }}
                            >
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                    required
                                />
                                <div className="dropzone__inner">
                                    <div className="dropzone__icon-wrap">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round"/>
                                            <circle cx="6" cy="18" r="3" />
                                            <circle cx="18" cy="16" r="3" />
                                        </svg>
                                        {songFile && <div className="dropzone__check">✓</div>}
                                    </div>
                                    <p className="dropzone__label">
                                        {songFile ? songFile.name : "Drop audio file here"}
                                    </p>
                                    <span className="dropzone__hint">
                                        {songFile ? "Click to change file" : "MP3, WAV, FLAC, AAC supported"}
                                    </span>
                                </div>
                                {/* Waveform animation bars */}
                                {songFile && (
                                    <div className="waveform">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <span key={i} className="waveform__bar" style={{ animationDelay: `${i * 0.08}s` }} />
                                        ))}
                                    </div>
                                )}
                            </label>

                            {/* Poster / Cover Art Drop Zone */}
                            <label
                                className={`dropzone dropzone--poster${posterDragging ? " dropzone--active" : ""}${posterFile ? " dropzone--filled" : ""}`}
                                onDragOver={(e) => { e.preventDefault(); setPosterDragging(true); }}
                                onDragLeave={() => setPosterDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setPosterDragging(false); handlePosterChange(e.dataTransfer.files[0]); }}
                                style={posterPreview ? { backgroundImage: `url(${posterPreview})` } : {}}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePosterChange(e.target.files[0])}
                                    required
                                />
                                <div className={`dropzone__inner${posterPreview ? " dropzone__inner--overlay" : ""}`}>
                                    <div className="dropzone__icon-wrap">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="3" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        {posterFile && <div className="dropzone__check">✓</div>}
                                    </div>
                                    <p className="dropzone__label">
                                        {posterFile ? posterFile.name : "Drop cover art here"}
                                    </p>
                                    <span className="dropzone__hint">
                                        {posterFile ? "Click to change image" : "JPG, PNG, WEBP supported"}
                                    </span>
                                </div>
                            </label>
                        </div>

                        {/* RIGHT COLUMN — Text fields */}
                        <div className="form-col form-col--right">

                            <div className="field-group">
                                <label className="field-label">Song Title</label>
                                <div className="field-wrap">
                                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18V5l12-2v13" strokeLinecap="round"/>
                                        <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                                    </svg>
                                    <input
                                        className="field-input"
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Blinding Lights"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Artist Name</label>
                                <div className="field-wrap">
                                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    <input
                                        className="field-input"
                                        type="text"
                                        name="artist"
                                        placeholder="e.g. The Weeknd"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Release Date</label>
                                <div className="field-wrap">
                                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                    </svg>
                                    <input
                                        className="field-input field-input--date"
                                        type="date"
                                        name="releaseDate"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Mood</label>
                                <div className="mood-grid">
                                    {moodOptions.map(({ value, emoji, color }) => (
                                        <label
                                            key={value}
                                            className={`mood-chip${form.mood === value ? " mood-chip--active" : ""}`}
                                            style={form.mood === value ? { "--mood-color": color } : {}}
                                        >
                                            <input
                                                type="radio"
                                                name="mood"
                                                value={value}
                                                checked={form.mood === value}
                                                onChange={handleChange}
                                            />
                                            <span className="mood-chip__emoji">{emoji}</span>
                                            <span className="mood-chip__label">{value}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="upload-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="16 16 12 12 8 16" strokeLinecap="round" strokeLinejoin="round"/>
                                    <line x1="12" y1="12" x2="12" y2="21" strokeLinecap="round"/>
                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" strokeLinecap="round"/>
                                </svg>
                                <span>Publish Track</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadSong;