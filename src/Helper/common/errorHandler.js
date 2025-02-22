class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
  }
}

function handleError(err, res) {
  res.status(err.statusCode || 500).json({
    status: err.status ? err.status : 'error',
    message: err.message ? err.message : 'Unknown error',
  });
}

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

module.exports = { ErrorHandler, handleError, catchAsync };
