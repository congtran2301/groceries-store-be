import { Router } from 'express';
import reportController from './report.controller';
import reportValidationSchema from './report.validation';
import validate from '../../common/middleware/validation';
import authServices from '../Auth/auth.services';
const router = Router();

router.use(authServices.isAuthentication, authServices.hasOwnerPermission);
router.post(
  '/',
  validate(reportValidationSchema.createReportSchema),
  reportController.getReport
);

export default router;
