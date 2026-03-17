const express = require('express');
const SongRouter = express.Router();
const uploadMiddleware = require('../middlewares/upload.middleware.js');
const songController = require('../controllers/song.controller.js');

SongRouter.post(
    '/',
    uploadMiddleware.fields([
        { name: 'song', maxCount: 1 },
        { name: 'poster', maxCount: 1 }
    ]),
    songController.uploadSong
);
SongRouter.get('/',songController.getSong)
module.exports = SongRouter;