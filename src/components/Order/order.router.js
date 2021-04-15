import { Router } from 'express';
import orderController from './order.controller';
import authServices from '../Auth/auth.services';
import validate from '../../common/middleware/validation';
import orderValidationSchema from './order.validation';

const router = Router();
const staffRouter = Router();

staffRouter.get('/', orderController.getOrders);
staffRouter.get('/:id', orderController.getOrder);
staffRouter.put(
  '/:orderId',
  validate(orderValidationSchema.updateOrder, 'body'),
  orderController.updateOrder
);

router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);
router.use(authServices.isAuthentication);
router.get('/', orderController.getOrders);
router.get('/:orderId', orderController.getOrder);
router.post(
  '/',
  validate(orderValidationSchema.createOrder, 'body'),
  orderController.createOrder
);

export default router;
