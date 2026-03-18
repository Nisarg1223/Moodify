// Player.jsx
import { useContext } from "react";
import { SongContext } from "../song.context";

const Player = () => {
  const { songs, activeSong, playSong } = useContext(SongContext);

  if (!songs || songs.length === 0) return null;

  return (
    <div>

      <div className="section-heading">
        <h2 className="section-heading-title">Trending Right Now</h2>
        <span className="section-heading-link">Show All</span>
      </div>

      <table className="songs-table">
        <thead>
          <tr className="songs-table-header">
            <th style={{ width: "40px" }}>#</th>
            <th>Title</th>
            <th>Album</th>
            <th className="col-plays">Plays</th>
            <th></th>
            <th className="col-dur">⏱</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, index) => {
            const isActive = activeSong?._id === song._id;
            return (
              <tr
                key={song._id}
                className={isActive ? "playing" : ""}
                onClick={() => playSong(song)}
              >

                {/* # */}
                <td>
                  <span className={`song-number ${isActive ? "is-playing" : ""}`}>
                    {isActive ? "▶" : index + 1}
                  </span>
                </td>

                {/* Thumb + name + artist */}
                <td>
                  <div className="song-title-cell">
                    <img
                      className="song-thumb"
                      src={song.posterUrl}
                      alt={song.title}
                    />
                    <div>
                      <div className="song-name">{song.title}</div>
                      <div className="song-artist-small">{song.artist}</div>
                    </div>
                  </div>
                </td>

                {/* Album */}
                <td>
                  <span className="song-album">{song.album || "—"}</span>
                </td>

                {/* Plays */}
                <td>
                  <span className="song-plays">
                    {song.plays
                      ? Number(song.plays).toLocaleString()
                      : "—"}
                  </span>
                </td>

                {/* Heart */}
                <td>
                  <span
                    className={`song-heart ${isActive ? "liked" : ""}`}
                    onClick={e => e.stopPropagation()}
                  >
                    {isActive ? "❤️" : "🤍"}
                  </span>
                </td>

                {/* Duration */}
                <td>
                  <span className="song-duration">{song.duration || "—"}</span>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Player;