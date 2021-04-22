import express from 'express';
import errorHandler from '../../common/middleware/errorHandler';
import validate from '../../common/middleware/validation';
import userValidationSchema from '../User/user.validation';
import authController from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validate({
    body: userValidationSchema.userRegister
  }),
  authController.register
);
router.post(
  '/login',
  validate({
    body: userValidationSchema.userLogin
  }),
  authController.login
);

export default router;
