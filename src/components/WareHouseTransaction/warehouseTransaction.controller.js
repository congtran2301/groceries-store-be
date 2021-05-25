import orderServices from '../Order/order.services';
import warehouseItemServices from '../WareHouseItem/warehouseItem.services';
import CustomError from '../../common/CustomError';
import warehouseTransactionService from './warehouseTransaction.service';
import { Statuses } from '../Order/order.config';
import { success } from '../../common/utils/response';
export default {
  importProduct(req, res, next) {
    try {
      const { warehouseItemId, quantity, type } = req.body;
    } catch (err) {
      next(err);
    }
  },
  async exportProductForOrder(req, res, next) {
    try {
      const { orderId } = req.body;

      const { products, status, _id } = await orderServices.getOrder({
        _id: orderId
      });

      if (status !== 'processing')
        throw new CustomError('Only valid in processing order', 400);

      const warehouseItems = await Promise.all(
        products.map(async ({ productId, quantity }) => {
          const updatedWarehouseItem =
            await warehouseItemServices.decreaseQuantity(
              { productId },
              quantity,
              null,
              {
                populate: 'product'
              }
            );
          const warehouseTransaction = await warehouseTransactionService.create(
            {
              warehouseItemId: updatedWarehouseItem._id,
              orderId: _id,
              type: 0,
              quantity
            }
          );
        })
      );

      const updatedOrderStatus = await orderServices.updateOrder(
        { _id },
        { status: Statuses.Exported }
      );

      return success({ res, data: updatedOrderStatus, statusCode: 200 });
    } catch (err) {
      next(err);
    }
  },
  async get(req, res, next) {}
};
