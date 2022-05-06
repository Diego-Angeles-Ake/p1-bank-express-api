// Encrypt
const bcrypt = require('bcryptjs');
// Helpers
const { genAccNum } = require('../helpers/account-number.helper');
const { AppError } = require('../helpers/app-error.helper');
const { catchAsync } = require('../helpers/catch-async.helper');
// Models
const { Transfer } = require('../models/transfer.model');
const { User } = require('../models/user.model');

const signUp = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const accountNumber = genAccNum();
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    accountNumber,
    password: hashPassword,
  });
  user.password = undefined;

  res.status(201).json({ user });
});

const login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
    },
  });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!user || !validPassword)
    return next(new AppError('Invalid credentials', 400));
  user.password = undefined;
  res.status(200).json({ user });
});

const getUserInfo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return res.status(200).json({ user });
});

const getHistory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transfers = await Transfer.findAll({
    // where: { [Op.or]: [{ senderUserId: id }, { receiverUserId: id }] },
    where: { senderUserId: id },
  });

  res.status(200).json({ transfers });
});

module.exports = {
  signUp,
  login,
  getHistory,
  getUserInfo,
};
