import axios from 'axios';
import { getAuthToken } from '../../auth/auth.context.jsx';

const api = axios.create({
    baseURL: 'https://moodify-2he8.onrender.com',
    withCredentials: true
});

// Attach Bearer token on every request if available (fixes cross-origin cookie issue)
api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


/**
 *  Add song to history
 */
export async function addToHistory({ songId }) {
    const response = await api.post('/api/history', {
        songId
    });
    return response.data;
}


/**
 *  Get user history
 */
export async function getHistory() {
    const response = await api.get('/api/history');
    return response.data;
}
