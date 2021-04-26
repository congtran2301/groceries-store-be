import Joi from 'joi';
import { isoDate } from '../../common/joiSchema';
import { Types } from './report.config';
import RequestTypes from '../../common/requestTypes';

const createReportSchema = {
  [RequestTypes.Body]: Joi.object({
    fromDate: isoDate.less(Joi.ref('toDate')).required(),
    toDate: isoDate.required(),
    type: Joi.string().valid(...Object.values(Types))
  })
};

export default { createReportSchema };
