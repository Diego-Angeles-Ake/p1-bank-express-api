const express = require('express');
const router = express.Router();

// Controler
const UserController = require('../controllers/user.controller');

// Middleware
const { userExists } = require('../middlewares/user.middleware');

router.get('/:id', userExists, UserController.getUserInfo);
router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);
router.get('/:id/history', userExists, UserController.getHistory);

module.exports = { userRouter: router };
