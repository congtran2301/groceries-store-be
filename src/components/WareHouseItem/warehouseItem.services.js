import CustomError from '../../common/CustomError';
import warehouseTransactionService from '../WareHouseTransaction/warehouseTransaction.service';
import WarehouseItem from './warehouseItem.model';

const warehouseItemServices = {
  getAll: async ({ query, pagination, options }) => {
    const { page, perPage } = pagination;
    const skip = (page - 1) * perPage;
    return await WarehouseItem.find(query, null, options)
      .skip(skip)
      .limit(perPage);
  },
  create: async (data) => {
    const newWarehouseItem = new WarehouseItem(data);
    newWarehouseItem.save();
    return newWarehouseItem;
  },
  getOne: async (query, select, options) => {
    return await WarehouseItem.findOne(query, select, options);
  },
  async decreaseQuantity(query, quantity, select, options) {
    // query.quantity = { $gte: quantity };
    const item = await WarehouseItem.findOne(query, select, options);
    // if (!item) throw new CustomError(`item in warehouse is not enough`, 400);
    if (item.quantity < quantity)
      throw new CustomError(
        `${item.product.name} is not enough in stock, available in stock: ${item.quantity}`,
        400
      );

    const updatedWarehouseItem = await WarehouseItem.findOneAndUpdate(
      query,
      {
        $inc: { quantity: quantity * -1 }
      },
      { new: true }
    );
    return updatedWarehouseItem;
  },
  count: async (query) => await WarehouseItem.find(query).countDocuments()
};
export default warehouseItemServices;
