import WarehouseItem from './warehouseItem.model';

const warehouseItemServices = {
  getAll: async ({ query, pagination }) => {
    const { page, perPage } = pagination;
    const skip = (page - 1) * perPage;
    return await WarehouseItem.find(query, null, {
      populate: [{ path: 'product' }]
    })
      .skip(skip)
      .limit(perPage)
      .exec();
  },
  create: async (data) => {
    const newWarehouseItem = new WarehouseItem(data);
    newWarehouseItem.save();
    return newWarehouseItem;
  },
  getOne: async (query) => {},
  count: async (query) => await WarehouseItem.find(query).countDocuments()
};
export default warehouseItemServices;
