const express = require('express');
const router = express.Router();

// Controler
const UserController = require('../controllers/user.controller');

// Middleware
const { userExists } = require('../middlewares/user.middleware');
const {
  createUserValidations,
  checkValidations,
  logUserValidations,
} = require('../middlewares/validation.middleware');

router.get('/:id', userExists, UserController.getUserInfo);
router.post(
  '/signup',
  createUserValidations,
  checkValidations,
  UserController.signUp
);
router.post(
  '/login',
  logUserValidations,
  checkValidations,
  UserController.login
);
router.get('/:id/history', userExists, UserController.getHistory);

module.exports = { userRouter: router };
