import { Router } from 'express';
import { mongoIdSchema } from '../../common/joiSchema';
import authServices from '../Auth/auth.services';
import validate from '../../common/middleware/validation';
import measureController from './measure.controller';
import measureValidationSchema from './measure.validation';

const router = Router();

router.post(
  '/',
  validate(measureValidationSchema.createMeasure),
  measureController.createMeasure
);
router.get('/', measureController.getMeasures);

export default router;
