import Supplier from './supplier.model';

const createSupplier = async (supplier) => {
  const newSupplier = new Supplier(supplier);
  await newSupplier.save();
  return newSupplier;
};
const getSuppliers = async (query) => {
  return await Supplier.find(query);
};
const getSupplier = async (query) => {
  return await Supplier.findOne(query);
};
export default {
  createSupplier,
  getSuppliers,
  getSupplier
};
