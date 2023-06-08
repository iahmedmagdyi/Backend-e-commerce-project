const ApiError = require("../utility/ApiError");

const sendErrorOnDevelopment = (err, res) =>
  res.status(400).json({
    status: err.status,
    error: err,
    message: err.emssage,
    stack: err.stack,
  });

const sendErrorOnProduction = (err, res) =>
  res.status(400).json({
    status: err.status,
    message: err.emssage,
  });
  const handleJwtInvalidSignature = () =>
  new ApiError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
  new ApiError('Expired token, please login again..', 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorOnDevelopment(err, res);
  } else {
    if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
    if (err.name === 'TokenExpiredError') err = handleJwtExpired();
    sendErrorOnProduction(err, res);
  }
};
module.exports = globalError;
