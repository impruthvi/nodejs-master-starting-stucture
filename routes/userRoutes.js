const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const {
  signUpValidationSchema,
  loginValidationSchema,
  updateMeValidationSchema,
  updateMyPasswordeValidationSchema,
  forgotPasswordValidationSchema
} = require('../validations/userValidation');
const valdiateResultSchema = require('../utils/validator');

const router = express.Router();

router.post(
  '/signup',
  signUpValidationSchema,
  valdiateResultSchema,
  authController.signup
);

router.post(
  '/login',
  loginValidationSchema,
  valdiateResultSchema,
  authController.login
);

router.get('/logout', authController.logout);

router.post(
  '/forgotPassword',
  forgotPasswordValidationSchema,
  valdiateResultSchema,
  authController.forgotPassword
);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all the routes after this middleware
router.use(authController.protect);

router.patch(
  '/updateMyPassword',
  updateMyPasswordeValidationSchema,
  valdiateResultSchema,
  authController.updatePassword
);
router.patch(
  '/updateMe',
  updateMeValidationSchema,
  valdiateResultSchema,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.route('/me').get(userController.getMe, userController.getUser);

// router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
