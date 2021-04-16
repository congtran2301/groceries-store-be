import express from 'express';
const router = express.Router();
import validate from '../../common/middleware/validation';
import userValidationSchema from '../User/user.validation';
import authController from './auth.controller';

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
