import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
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
