import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const uploadSong = async (formData) => {
    const res = await api.post("/api/songs", formData);
    return res.data;
};