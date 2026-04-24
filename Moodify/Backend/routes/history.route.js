const express = require('express');
const router = express.Router();

const historyController = require('../controllers/history.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// add song to history
router.post('/', authMiddleware.authUser, historyController.addToHistory);

// get history
router.get('/', authMiddleware.authUser, historyController.getHistory);

module.exports = router;