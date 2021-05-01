import { Router } from 'express';
import warehouseController from './warehouseItem.controller';

const router = Router();

router.get('/', warehouseController.getWarehouseItems);

export default router;
