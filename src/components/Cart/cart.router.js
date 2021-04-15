import { Router } from 'express';
import cartController from './cart.controller';
import authServices from '../Auth/auth.services';
import cartItemRouter from '../CartItem/cartItem.router';
const router = Router();

router.use(authServices.isAuthentication);
router.use('/', cartItemRouter);
router.get('/', cartController.getCart);

export default router;
