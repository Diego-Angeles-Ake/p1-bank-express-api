const { AppError } = require('../helpers/app-error.helper');
const { catchAsync } = require('../helpers/catch-async.helper');
const { User } = require('../models/user.model');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) return next(new AppError('No user found with given Id', 404));
  next();
});
module.exports = {
  userExists,
};
