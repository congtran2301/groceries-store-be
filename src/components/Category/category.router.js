import { Router } from 'express';
import categoryController from './category.controller';
import validate from '../../common/middleware/validation';
import categoryValidationSchema from './category.validation';
import { mongoIdSchema } from '../../common/joiSchema';
import authServices from '../Auth/auth.services';

const router = Router();
const staffRouter = Router();

staffRouter.get('/', categoryController.getCategories);
staffRouter.post(
  '/',
  validate({ body: categoryValidationSchema.createCategorySchema }),
  categoryController.createCategory
);
staffRouter.put(
  '/:id',
  validate({
    body: categoryValidationSchema.updateCategorySchema,
    params: mongoIdSchema
  }),
  categoryController.updateCategoryById
);

staffRouter.delete(
  '/:id',
  validate({ params: mongoIdSchema }),
  categoryController.deleteCategoryById
);

router.get('/', categoryController.getActiveCategories);
router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);

export default router;
