const { body, validationResult } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isStrongPassword({ minSymbols: 0 })
    .withMessage(
      'Password must be at least 8 characters long, with 1 uppercase, 1 lowercase and 1 number'
    ),
];

const logUserValidations = [
  body('accountNumber')
    .notEmpty()
    .withMessage('Account number cannot be empty'),
  body('password').notEmpty().withMessage('Password cannot be empty'),
];

const createTransferValidations = [
  body('amount').notEmpty().withMessage('Amount number cannot be empty'),
  body('senderUserId').notEmpty().withMessage('Sender Id cannot be empty'),
  body('receiverAccount')
    .notEmpty()
    .withMessage('Receiver account cannot be empty'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = {
  createUserValidations,
  logUserValidations,
  createTransferValidations,
  checkValidations,
};
