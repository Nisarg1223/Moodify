import { useState, createContext, useRef, useEffect } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [activeSong, setActiveSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  // ONE audio instance, never recreated
  const audioRef = useRef(null);
  if (!audioRef.current) {
    audioRef.current = new Audio();
  }

  // songsRef so onended always sees latest songs list
  const songsRef = useRef(songs);
  const activeSongRef = useRef(activeSong);
  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);
  useEffect(() => {
    activeSongRef.current = activeSong;
  }, [activeSong]);


  // the fmt function is used to convert sec in to minutes and seconds format like 7:12 etc
  function fmt(sec) {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  
  useEffect(() => {
    const audio = audioRef.current;
// song progress
    function onTimeUpdate() {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrent(fmt(audio.currentTime));
      setDuration(fmt(audio.duration));
    }
  //runs when the song is ended. and plays the next or first song.
    function onEnded() {
      const list = songsRef.current;
      const cur = activeSongRef.current;
      if (!list.length || !cur) return;
      const idx = list.findIndex((s) => s._id === cur._id);
      const next = list[idx + 1] || list[0];
      playSong(next);
    }

    function onLoadedMetadata() {
      setDuration(fmt(audio.duration));
    }

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    // cleanup on unmount
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []); // empty array = runs once only

  // The ONE function that changes the song
  function playSong(song) {
    const audio = audioRef.current;

    // stop current song completely
    audio.pause();
    audio.src = ""; // clear src so old song is gone
    audio.load(); // reset the audio element

    if (!song) {
      setActiveSong(null);
      setIsPlaying(false);
      setProgress(0);
      setCurrent("0:00");
      setDuration("0:00");
      return;
    }

    // load new song
    audio.src = song.url;
    audio.load();

    // play and update state
    audio
      .play()
      .then(() => {
        setActiveSong(song);
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Play failed:", err);
        setIsPlaying(false);
      });
  }

  // Play / Pause toggle
  function togglePlay() {
    const audio = audioRef.current;
    if (!activeSong) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Play failed:", err));
    }
  }

  // Seek
  function seekTo(ratio) {
    const audio = audioRef.current;
    if (!audio.duration) return;
    audio.currentTime = ratio * audio.duration;
  }

  // Next
  function nextSong() {
    if (!songs.length || !activeSong) return;
    const idx = songs.findIndex((s) => s._id === activeSong._id);
    const next = songs[idx + 1] || songs[0];
    playSong(next);
  }

  // Previous
  function prevSong() {
    if (!songs.length || !activeSong) return;
    const idx = songs.findIndex((s) => s._id === activeSong._id);
    const prev = songs[idx - 1] || songs[songs.length - 1];
    playSong(prev);
  }

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        activeSong,
        loading,
        setLoading,
        isPlaying,
        progress,
        current,
        duration,
        playSong, // use playSong instead of setActiveSong everywhere
        togglePlay,
        seekTo,
        nextSong,
        prevSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
