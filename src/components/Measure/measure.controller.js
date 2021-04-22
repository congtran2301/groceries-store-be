import { pick } from 'lodash';
import { success, error } from '../../common/utils/response';
import measureService from './measure.services';

const getMeasures = async (req, res) => {
  try {
    const measures = await measureService.getMeasures();
    return success({ res, message: 'Success', data: measures });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};
const createMeasure = async (req, res) => {
  try {
    const measureBody = pick(req.body, ['sign', 'description']);
    await measureService.createMeasure(measureBody);
    return success({ res, message: 'Success', statusCode: 201 });
  } catch (err) {
    return error({ res, message: err.message, statusCode: 400 });
  }
};

export default {
  getMeasures,
  createMeasure
};
