import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const songContext = useContext(SongContext);
    const { loading, setLoading, songs, setSongs } = songContext; // ← new variable names

    async function handlegetSong({ mood }) {
        setLoading(true);
        const data = await getSong({ mood });
        setSongs(data.songs); // ← songs array not song
        setLoading(false);
    }

    return { loading, songs, handlegetSong };
}