const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('../routes/auth.route.js')
const cors = require('cors');
const SongRouter = require('../routes/song.route.js');
const historyRouter = require('../routes/history.route.js');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use('/api/auth',authRouter);
app.use('/api/songs',SongRouter);
app.use('/api/history', historyRouter);
module.exports = app;