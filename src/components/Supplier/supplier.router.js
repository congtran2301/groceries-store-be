import { Router } from 'express';
import authServices from '../Auth/auth.services';
import supplierController from './supplier.controller';
import supplierValidationSchema from './supplier.validation';
import validate from '../../common/middleware/validation';
import commonValidation from '../../common/validation';

const router = Router();

router.use(authServices.isAuthentication, authServices.hasStaffPermission);
router
  .route('/')
  .get(supplierController.getSuppliers)
  .post(
    validate(supplierValidationSchema.createSupplierSchema),
    supplierController.createSupplier
  );
router
  .route('/:id')
  .all(validate(commonValidation.paramsIdSchema))
  .get(supplierController.getSupplier)
  .put(supplierController.updateSupplier);

export default router;
