const { validationResult } = require('express-validator');
const AppError = require('./appError');

const valdiateResultSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.errors[0].msg, 400));
  }
  next();
};

module.exports = valdiateResultSchema;
