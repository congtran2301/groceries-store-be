import userController from './user.controller';
import { Router } from 'express';
import authServices from '../Auth/auth.services';
const router = Router();
const staffRouter = Router();

staffRouter.get('/', userController.getUsers);
staffRouter
  .route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUserById)
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
  .all(authServices.selfModify)
  .get(userController.getUserById)
  .put(userController.updateUserById);

export default router;
