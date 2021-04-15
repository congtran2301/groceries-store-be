import { Router } from 'express';
import authServices from '../Auth/auth.services';
import staffController from './staff.controller';

const router = Router();

router.use(authServices.isAuthentication, authServices.hasOwnerPermission);
router.get('/', staffController.getStaffs);
router.post('/', staffController.createStaff);
router.delete('/:id', staffController.deleteStaffById);

export default router;
