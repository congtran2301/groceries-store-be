import { Router } from 'express';
import reportController from './report.controller';
import reportValidationSchema from './report.validation';
import validate from '../../common/middleware/validation';
const router = Router();

router.post(
  '/',
  validate(reportValidationSchema.createRevenueReportFromDateToDateSchema),
  reportController.getReport
);

export default router;
