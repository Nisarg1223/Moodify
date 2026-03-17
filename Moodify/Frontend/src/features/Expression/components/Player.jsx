import { useContext } from "react";
import { SongContext } from "../song.context";

const Player = () => {
    const { songs, activeSong, setActiveSong } = useContext(SongContext);

    if (!songs || songs.length === 0) return null;

    return (
        <div style={{ marginTop: "30px" }}>

            {/* now playing */}
            {activeSong && (
                <div>
                    <img src={activeSong.posterUrl} alt={activeSong.title} width="200" />
                    <h3>{activeSong.title} — {activeSong.artist}</h3>
                    <audio key={activeSong._id} controls autoPlay src={activeSong.url} />
                </div>
            )}

            {/* song list */}
            <div style={{ marginTop: "20px" }}>
                {songs.map((song) => (
                    <div
                        key={song._id}
                        onClick={() => setActiveSong(song)}
                        style={{
                            cursor: "pointer",
                            padding: "10px",
                            background: activeSong?._id === song._id ? "#ddd" : "#1e1d1d",
                            color:'black',
                            marginBottom: "8px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <img src={song.posterUrl} width="50" height="50"
                            style={{ borderRadius: "6px" }} />
                        <span>{song.title} — {song.artist}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Player;