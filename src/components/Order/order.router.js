import { Router } from 'express';
import orderController from './order.controller';
import authServices from '../Auth/auth.services';
import validate from '../../common/middleware/validation';
import orderValidationSchema from './order.validation';
import commonValidation from '../../common/validation';

const router = Router();
const staffRouter = Router();

staffRouter.get('/', orderController.getOrders);
staffRouter
  .route('/:id')
  .all(validate(commonValidation.paramsIdSchema))
  .get(orderController.getOrder)
  .put(
    validate(orderValidationSchema.updateOrder),
    orderController.updateOrder
  );

router.use(
  '/staff',
  authServices.isAuthentication,
  authServices.hasStaffPermission,
  staffRouter
);

router.use(authServices.isAuthentication);
router
  .route('/')
  .get(validate(orderValidationSchema.getOrders), orderController.getOrders)
  .post(
    validate(orderValidationSchema.createOrder),
    orderController.createOrder
  );

router.get(
  '/:id',
  validate(validate(commonValidation.paramsIdSchema)),
  orderController.getOrder
);

export default router;
