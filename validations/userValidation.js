const { body } = require('express-validator');

exports.signUpValidationSchema = [
  body('name')
    .isString()
    .withMessage('Please tell us your name')
    .not()
    .isEmpty()
    .withMessage('Please tell us your name'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .not()
    .isEmpty()
    .withMessage('Please provide your email'),
  body('password')
    .isString()
    .withMessage('Please provide a passowrd')
    .not()
    .isEmpty()
    .withMessage('Please provide a passowrd')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((value, { req }) => value === req.body.passwordConfirm)
    .withMessage('The passwords do not match'),
  body('photo')
    .isString()
    .optional(),
  body('role')
    .isString()
    .optional(),
  body('passwordChangedAt')
    .isDate()
    .optional(),
  body('passwordResetToken')
    .isString()
    .optional(),
  body('passwordResetExpires')
    .isDate()
    .optional(),
  body('active')
    .optional()
    .isBoolean()
    .default(true)
];

exports.loginValidationSchema = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .not()
    .isEmpty()
    .withMessage('Please provide your email'),
  body('password')
    .isString()
    .withMessage('Please provide a passowrd')
    .not()
    .isEmpty()
    .withMessage('Please provide a passowrd')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
];

exports.updateMeValidationSchema = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .not()
    .isEmpty()
    .withMessage('Please provide your email'),
  body('name')
    .isString()
    .withMessage('Please tell us your name')
    .not()
    .isEmpty()
    .withMessage('Please tell us your name')
];

exports.updateMyPasswordeValidationSchema = [
  body('password')
    .isString()
    .withMessage('Please provide a passowrd')
    .not()
    .isEmpty()
    .withMessage('Please provide a passowrd')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((value, { req }) => value === req.body.passwordConfirm)
    .withMessage('The passwords do not match')
];

exports.forgotPasswordValidationSchema = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .not()
    .isEmpty()
    .withMessage('Please provide your email')
];
