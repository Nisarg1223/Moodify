const SongModel = require('../models/song.model.js');
const { uploadFile } = require('../services/storage.service.js'); 

async function uploadSong(req, res) {
    try {
        const { title, artist, mood, releaseDate } = req.body;

        const songFile = req.files['song'][0];
        const posterFile = req.files['poster'][0];

        const uploadedSong = await uploadFile({
            buffer: songFile.buffer,
            filename: songFile.originalname,
            folder: '/moodify/songs'
        });

        const uploadedPoster = await uploadFile({
            buffer: posterFile.buffer,
            filename: posterFile.originalname,
            folder: '/moodify/posters'
        });

        const newSong = await SongModel.create({
            title,
            artist,
            mood,
            releaseDate,
            url: uploadedSong.url,
            posterUrl: uploadedPoster.url
        });

        res.status(201).json({
            message: "Song uploaded successfully",
            song: newSong
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function getSong(req,res){
    const {mood} = req.query;

    const songs = await SongModel.find({
      mood
    })

    res.status(200).json({
        message:'song fetched sucessfully',
        songs
    })
}
module.exports = { uploadSong, getSong};