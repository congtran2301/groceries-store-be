import { Router } from 'express';
import cartItemController from './cartItem.controller';
import authServices from '../Auth/auth.services';
import validate from '../../common/middleware/validation';
import cartItemValidationSchema from './cartItem.validation';

const router = Router();

router.use(authServices.isAuthentication);
router
  .route('/')
  .put(
    validate({
      body: cartItemValidationSchema.updateCartItemSchema
    }),
    cartItemController.updateCart
  )
  .post(
    validate({
      body: cartItemValidationSchema.addToCartSchema
    }),
    cartItemController.addItemToCart
  );

export default router;
