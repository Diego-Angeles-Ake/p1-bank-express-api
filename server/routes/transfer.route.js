const express = require('express');
const TransferController = require('../controllers/transfer.controller');
const router = express.Router();

router.post('/', TransferController.createTransfer);

module.exports = { transferRouter: router };
