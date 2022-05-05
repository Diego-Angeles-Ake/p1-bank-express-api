const express = require('express');
const cors = require('cors');
const app = express();
// Request limiter
const { limiter } = require('./helpers/rate-limit.helper');
// Controller
const { globalErrorHandler } = require('./controllers/error.controller');
// Router
const { transferRouter } = require('./routes/transfer.route');
const { userRouter } = require('./routes/user.route');
// Enable CORS
app.use(cors());
// Enable JSON
app.use(express.json());
// Limit IP requests
app.use(limiter);
// Endpoints
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', transferRouter);
// Global error handler
app.use('*', globalErrorHandler);
module.exports = {
  app,
};
