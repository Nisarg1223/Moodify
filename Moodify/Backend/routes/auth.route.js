const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller.js')
authRouter.post('/register',authController.registerUser);
authRouter.post('/login',authController.loginUser);
module.exports = authRouter