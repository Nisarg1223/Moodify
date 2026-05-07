import axios from 'axios';

const api = axios.create({
    baseURL: 'https://moodify-2he8.onrender.com',
    withCredentials: true
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
