import Joi from 'joi';
import { isoDate } from '../../common/joiSchema';
import { Types } from './report.config';

const createReportSchema = {
  body: Joi.object({
    fromDate: isoDate.less(Joi.ref('toDate')).required(),
    toDate: isoDate.required(),
    type: Joi.string().valid(...Object.values(Types))
  })
};

export default { createReportSchema };
