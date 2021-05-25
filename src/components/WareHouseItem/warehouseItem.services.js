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
  count: async (query) => await WarehouseItem.find(query).countDocuments()
};
export default warehouseItemServices;
