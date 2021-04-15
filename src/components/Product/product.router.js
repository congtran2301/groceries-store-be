import { Router } from 'express';
import productController from './product.controller';
import authServices from '../Auth/auth.services';

const router = Router();
const staffRouter = Router();

staffRouter.get('/:id', productController.getProductById);
staffRouter.get('/', productController.getProducts);
staffRouter.post('/', productController.createProduct);
staffRouter.put('/:id', productController.updateProductById);
staffRouter.delete('/:id', productController.deleteProductById);

router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProducts);

export default router;
