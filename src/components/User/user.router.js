import { Router } from 'express';
import { mongoIdSchema } from '../../common/joiSchema';
import validate from '../../common/middleware/validation';
import userController from './user.controller';
import userValidationSchema from './user.validation';
import authServices from '../Auth/auth.services';

const router = Router();
const staffRouter = Router();

staffRouter.get('/', userController.getUsers);
staffRouter
  .route('/:id')
  .all(validate({ params: mongoIdSchema }))
  .get(userController.getUserById)
  .put(
    validate({ body: userValidationSchema.userUpdate }),
    userController.updateUserById
  )
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
  .all(validate({ params: mongoIdSchema }), authServices.selfModify)
  .get(userController.getUserById)
  .put(userController.updateUserById);

export default router;
