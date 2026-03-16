const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'The URL is required to upload the song']
    },
    posterUrl: {
        type: String,
        required: [true, 'Poster URL is required']
    },
    title: {
        type: String,
        required: [true, 'Song title is required'],
        trim: true
    },

   
    artist: {
        type: String,
        required: [true, 'Artist name is required'],
        trim: true
    },

    
    mood: {
        type: String,
        enum: ['Happy', 'Sad', 'Excited'],
        required: [true, 'Mood is required']
    },

   
    releaseDate: {
        type: Date,
        required: [true, 'Release date is required']
    }

}, { timestamps: true });

const SongModel = mongoose.model('Song', songSchema);

module.exports = SongModel;