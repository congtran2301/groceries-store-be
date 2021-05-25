import WarehouseTransaction from './warehouseTransaction.model';

export default {
  async create(doc, options) {
    return await new WarehouseTransaction(doc).save(options);
  }
};
