import { useState } from 'react';
import {
    addToHistory,
    getHistory
} from '../services/history.service.js';

export const useHistory = () => {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch history
    async function handleGetHistory() {
        try {
            setLoading(true);
            const data = await getHistory();
            setHistory(data.history);
        } catch (err) {
            console.error("Error fetching history:", err);
        } finally {
            setLoading(false);
        }
    }

    // ✅ Add song to history
    async function handleAddToHistory({ songId }) {
        try {
            await addToHistory({ songId });

            // 🔥 optional: refresh history instantly
            handleGetHistory();

        } catch (err) {
            console.error("Error adding to history:", err);
        }
    }

    return {
        history,
        loading,
        handleGetHistory,
        handleAddToHistory
    };
};