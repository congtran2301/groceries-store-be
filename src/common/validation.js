import { mongoIdSchema } from './joiSchema';
import RequestTypes from './requestTypes';

const paramsIdSchema = {
  [RequestTypes.Params]: mongoIdSchema
};

export default {
  paramsIdSchema
};
