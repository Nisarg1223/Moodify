import axios from "axios";

const api = axios.create({
    baseURL: "https://moodify-2he8.onrender.com",
    withCredentials: true
});

export const uploadSong = async (formData) => {
    const res = await api.post("/api/songs", formData);
    return res.data;
};