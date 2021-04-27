import { Router } from 'express';
import validate from '../../common/middleware/validation';
import userController from './user.controller';
import userValidationSchema from './user.validation';
import authServices from '../Auth/auth.services';
import commonValidation from '../../common/validation';

const router = Router();
const staffRouter = Router();

staffRouter.get('/', userController.getUsers);
staffRouter
  .route('/:id')
  .all(validate(commonValidation.paramsIdSchema))
  .get(userController.getUserById)
  .put(validate(userValidationSchema.userUpdate), userController.updateUserById)
  .delete(userController.deleteUserById);

router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);

//route for normal user
router.use(authServices.isAuthentication);
router
  .route('/:id')
  .all(validate(commonValidation.paramsIdSchema), authServices.selfModify)
  .get(userController.getUserById)
  .put(userController.updateUserById);

export default router;
