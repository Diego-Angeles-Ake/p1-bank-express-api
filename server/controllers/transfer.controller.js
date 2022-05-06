const { AppError } = require('../helpers/app-error.helper');
const { catchAsync } = require('../helpers/catch-async.helper');
const { Transfer } = require('../models/transfer.model');
const { User } = require('../models/user.model');

const createTransfer = catchAsync(async (req, res, next) => {
  const { amount: amountToTransfer, senderUserId, receiverAccount } = req.body;

  const sender = await User.findOne({
    where: {
      id: senderUserId,
    },
  });
  const receiver = await User.findOne({
    where: {
      accountNumber: receiverAccount,
    },
  });
  if (sender['amount'] >= amountToTransfer) {
    const transfer = await Transfer.create({
      amount: amountToTransfer,
      senderUserId,
      receiverUserId: receiver.id,
    });
    const senderAmount = sender['amount'];
    const receiverAmount = receiver['amount'];
    sender.update({ amount: senderAmount - amountToTransfer });
    receiver.update({ amount: receiverAmount + amountToTransfer });
    return res.status(200).json({ transfer });
  } else {
    return next(new AppError('Not enough funds', 400));
  }
});

module.exports = { createTransfer };
