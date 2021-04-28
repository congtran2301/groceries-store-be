import { Router } from 'express';
const router = Router();

import userRouter from '../components/User/user.router';
import authRouter from '../components/Auth/auth.router';
import categoryRouter from '../components/Category/category.router';
import productRouter from '../components/Product/product.router';
import uploadRouter from '../components/Upload/upload.router';
import cartRouter from '../components/Cart/cart.router';
import staffRouter from '../components/Staff/staff.router';
import orderRouter from '../components/Order/order.router';
import reportRouter from '../components/Report/report.router';
import measureRouter from '../components/Measure/measure.router';
import userBehaviorRouter from '../components/UserBehavior/userBehavior.router';
import supplierRouter from '../components/Supplier/supplier.router';
import swaggerRouter from '../swagger/swagger.router';

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/upload', uploadRouter);
router.use('/cart', cartRouter);
router.use('/staff', staffRouter);
router.use('/order', orderRouter);
router.use('/report', reportRouter);
router.use('/measure', measureRouter);
router.use('/behavior', userBehaviorRouter);
router.use('/supplier', supplierRouter);
router.use('/docs', swaggerRouter);

export default router;
