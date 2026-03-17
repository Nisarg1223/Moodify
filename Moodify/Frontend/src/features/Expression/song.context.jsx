import { useState, createContext } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);           // ← setSongs
  const [activeSong, setActiveSong] = useState(null);
  const [loading, setLoading] = useState(false);    // ← setLoading

  return (
    <SongContext.Provider value={{ loading, setLoading, songs, setSongs, activeSong, setActiveSong }}>
        {children}
    </SongContext.Provider>
  )
};