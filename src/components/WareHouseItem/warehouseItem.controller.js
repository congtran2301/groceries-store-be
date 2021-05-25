import warehouseItemServices from './warehouseItem.services';
import paginationServices from '../../common/pagination';
import { omit } from 'lodash';
import { success } from '../../common/utils/response';

const getWarehouseItems = async (req, res, next) => {
  try {
    const { page, perPage } = paginationServices.handlePaginationFromQuery(req);
    const query = omit(req.query, ['page', 'perPage']);

    const [numberOfDocument, warehouseItems] = await Promise.all([
      warehouseItemServices.count(query),
      warehouseItemServices.getAll({
        query,
        pagination: { page, perPage },
        options: {
          populate: [
            {
              path: 'product',
              select: 'name price'
            }
          ]
        }
      })
    ]);

    const pagination = paginationServices.makePaginationData({
      numberOfDocument,
      currentPage: page,
      perPage
    });
    return success({ res, data: warehouseItems, pagination, statusCode: 200 });
  } catch (err) {
    return next(err);
  }
};
const getWarehouseItem = async (req, res, next) => {
  try {
    const { page, perPage } =
      paginationServices.handlePaginationFromQuery(paginationServices);
    const query = omit(req.query, ['page', 'perPage']);
  } catch (err) {
    return next(er);
  }
};

export default {
  getWarehouseItems,
  getWarehouseItem
};
