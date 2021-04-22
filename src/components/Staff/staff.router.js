import { Router } from 'express';
import { mongoIdSchema } from '../../common/joiSchema';
import authServices from '../Auth/auth.services';
import staffController from './staff.controller';
import validate from '../../common/middleware/validation';
import userValidationSchema from '../User/user.validation';

const router = Router();

router.use(authServices.isAuthentication, authServices.hasOwnerPermission);
router
  .route('/')
  .get(staffController.getStaffs)
  .post(
    validate({ body: userValidationSchema.userRegister }),
    staffController.createStaff
  );
router.delete(
  '/:id',
  validate({ params: mongoIdSchema }),
  staffController.deleteStaffById
);

export default router;
