import { omit, pick } from 'lodash';
import { success } from '../../common/utils/response';
import supplierServices from './supplier.services';
import paginationServices from '../../common/pagination';

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
    const supplier = await supplierServices.create(supplierBody);
    return success({ res, message: 'Successfully create', data: supplier });
  } catch (err) {
    next(err);
  }
};

const getSuppliers = async (req, res, next) => {
  try {
    const { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    const query = omit(req.query, ['page', 'perPage']);

    const suppliers = await supplierServices.getAll({
      query,
      pagination: { page, perPage }
    });
    const numberOfDocument = await supplierServices.count(query);

    const pagination = paginationServices.makePaginationData({
      numberOfDocument,
      currentPage: page,
      perPage
    });

    return success({
      res,
      message: 'get suppliers',
      data: suppliers,
      pagination
    });
  } catch (err) {
    next(err);
  }
};

const getSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await supplierServices.getOne({ _id: id });
    return success({
      message: 'get suppliers',
      res,
      data: supplier
    });
  } catch (err) {
    next(err);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    await supplierServices.updateOne({ _id: id }, supplierBody);

    return success({
      message: 'Supplier successfully updated',
      res
    });
  } catch (err) {
    next(err);
  }
};

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier
};
