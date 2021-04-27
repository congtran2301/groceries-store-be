import express from 'express';
import validate from '../../common/middleware/validation';
import authValidation from './auth.validation';
import authController from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.userRegister),
  authController.register
);
router.post('/login', validate(authValidation.userLogin), authController.login);

export default router;
