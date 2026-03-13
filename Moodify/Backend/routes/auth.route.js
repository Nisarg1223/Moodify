const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller.js')
const authmiddleware = require('../middlewares/auth.middleware.js');
authRouter.post('/register',authController.registerUser);
authRouter.post('/login',authController.loginUser);
authRouter.get('/get-me',authmiddleware.authUser,authController.getMe);
authRouter.get('/logout',authController.logout)
module.exports = authRouter