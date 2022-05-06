const express = require('express');
const TransferController = require('../controllers/transfer.controller');
const {
  createTransferValidations,
  checkValidations,
} = require('../middlewares/validation.middleware');
const router = express.Router();

router.post(
  '/',
  createTransferValidations,
  checkValidations,
  TransferController.createTransfer
);

module.exports = { transferRouter: router };
