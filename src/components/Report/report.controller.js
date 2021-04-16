import { success, error } from '../../common/utils/response';
import reportServices from './report.services';
import { Types } from './report.config';

const getProfitByDay = async (req, res) => {
  try {
    let { fromDate, toDate, type } = req.body;

    fromDate = new Date(fromDate);
    toDate = new Date(toDate + ' 23:59:59');

    reportServices.getProfitByDay(fromDate, toDate);
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const getReport = async (req, res) => {
  try {
    let { fromDate, toDate, type } = req.body;

    fromDate = new Date(fromDate);
    toDate = new Date(toDate + ' 23:59:59.999');

    let reportData;
    switch (type) {
      case Types.Product:
        reportData = await reportServices.getRevenueByProduct(fromDate, toDate);
        break;
    }
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  getProfitByDay,
  getReport
};
