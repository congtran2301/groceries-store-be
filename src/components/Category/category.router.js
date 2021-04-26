import { Router } from 'express';
import categoryController from './category.controller';
import validate from '../../common/middleware/validation';
import categoryValidationSchema from './category.validation';
import authServices from '../Auth/auth.services';
import commonValidation from '../../common/validation';

const router = Router();
const staffRouter = Router();

staffRouter.get('/', categoryController.getCategories);
staffRouter.post(
  '/',
  validate(categoryValidationSchema.createCategorySchema),
  categoryController.createCategory
);
staffRouter
  .route('/:id')
  .all(validate(commonValidation.paramsIdSchema))
  .put(
    validate(categoryValidationSchema.updateCategorySchema),
    categoryController.updateCategoryById
  )
  .delete(categoryController.deleteCategoryById);

router.get('/', categoryController.getActiveCategories);
router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);

export default router;
