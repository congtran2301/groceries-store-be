import { Router } from 'express';
import warehouseTransactionController from './warehouseTransaction.controller';

const router = Router();

router.post('/export', warehouseTransactionController.exportProductForOrder);

export default router;
