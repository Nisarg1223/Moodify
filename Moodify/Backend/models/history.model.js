const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true
    },
    playedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const HistoryModel = mongoose.model('History', historySchema);

module.exports = HistoryModel;