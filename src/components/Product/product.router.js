import { Router } from 'express';
import productController from './product.controller';
import authServices from '../Auth/auth.services';
import productValidationSchema from './product.validation';
import validate from '../../common/middleware/validation';
import commonValidation from '../../common/validation';

const router = Router();
const staffRouter = Router();

staffRouter
  .route('/')
  .get(productController.getProducts)
  .post(
    validate(productValidationSchema.createProduct),
    productController.createProduct
  );
staffRouter
  .route('/:id')
  .all(validate(commonValidation.paramsIdSchema))
  .get(productController.getProductById)
  .put(
    validate(productValidationSchema.updateProduct),
    productController.updateProductById
  )
  .delete(productController.deleteProductById);

router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);
router.post('/favorite', productController.changeFavoriteStatus);
router.get('/search', productController.searchProduct);
router.get(
  '/:id',
  authServices.optionalAuthentication,
  validate(commonValidation.paramsIdSchema),
  productController.getProductById
);
router.get(
  '/',
  validate(productValidationSchema.getProducts),
  productController.getProducts
);

export default router;
