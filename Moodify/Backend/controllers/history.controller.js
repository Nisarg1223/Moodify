const HistoryModel = require('../models/history.model.js');


// Save song to history
async function addToHistory(req, res) {
    try {
        const userId = req.user.id;
        const { songId } = req.body;

        if (!songId) {
            return res.status(400).json({ message: 'songId is required' });
        }

        // Prevent duplicate entries within 5 minutes for the same song
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const existing = await HistoryModel.findOne({
            user: userId,
            song: songId,
            createdAt: { $gte: fiveMinutesAgo }
        });

        if (existing) {
            return res.status(200).json({ message: 'Already in recent history', history: existing });
        }

        const history = await HistoryModel.create({
            user: userId,
            song: songId
        });

        res.status(201).json({
            message: "Song added to history",
            history
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



// Get user history
async function getHistory(req, res) {
    try {
        const userId = req.user.id;

        const history = await HistoryModel.find({ user: userId })
            .populate('song') // 🔥 important (gets song details)
            .sort({ createdAt: -1 }) // latest first
            .limit(20); // optional limit

        res.status(200).json({
            message: "History fetched successfully",
            history
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    addToHistory,
    getHistory
};