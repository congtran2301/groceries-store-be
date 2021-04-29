import Supplier from './supplier.model';

const supplierServices = {
  create: async (supplier) => {
    const newSupplier = new Supplier(supplier);
    await newSupplier.save();
    return newSupplier;
  },
  getAll: async ({ query, pagination }) => {
    const { page, perPage } = pagination;
    const skip = (page - 1) * perPage;
    return await Supplier.find(query).skip(skip).limit(perPage).exec();
  },
  getOne: async (query) => {
    return await Supplier.findOne(query);
  },
  updateOne: async (query, data) => {
    return await Supplier.findOneAndUpdate(query, data);
  },
  count: async (query = {}) => {
    return await Supplier.find(query).countDocuments();
  }
};

export default supplierServices;
