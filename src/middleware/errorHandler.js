const NotFoundError = require('../errors/NotFoundError');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      status: 'error',
      message: err.message
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(error => error.message)
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate Error',
      error: 'Email already exists'
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
};

module.exports = errorHandler;
