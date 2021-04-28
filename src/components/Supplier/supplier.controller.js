import { pick } from 'lodash';
import { success } from '../../common/utils/response';
import supplierServices from './supplier.services';

const createSupplier = async (req, res, next) => {
  try {
    const supplierBody = pick(req.body, [
      'name',
      'representation',
      'phone',
      'email',
      'address',
      'description',
      'provine',
      'city',
      'district',
      'ward',
      'imageUrl'
    ]);
    const supplier = await supplierServices.createSupplier(supplierBody);
    return success({ res, message: 'Successfully create', data: supplier });
  } catch (err) {
    next(err);
  }
};

const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await supplierServices.getSuppliers();
    return success({
      message: 'get suppliers',
      res,
      data: suppliers
    });
  } catch (err) {
    next(err);
  }
};

const getSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await supplierServices.getSupplier({ _id: id });
    return success({
      message: 'get suppliers',
      res,
      data: supplier
    });
  } catch (err) {
    next(err);
  }
};
export default {
  createSupplier,
  getSuppliers,
  getSupplier
};
