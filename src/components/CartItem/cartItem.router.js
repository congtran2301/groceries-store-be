import { Router } from 'express';
import cartItemController from './cartItem.controller';
import authServices from '../Auth/auth.services';
const router = Router();

router.use(authServices.isAuthentication);
router
  .route('/')
  .put(cartItemController.updateCart)
  .post(cartItemController.addItemToCart);

export default router;
