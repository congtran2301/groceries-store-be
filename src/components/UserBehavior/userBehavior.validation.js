import Joi from 'joi';
import RequestTypes from '../../common/requestTypes';
import { mongoId } from '../../common/joiSchema';

const changeFavoriteStatus = {
  [RequestTypes.Body]: Joi.object({
    productId: mongoId
  })
};

export default {
  changeFavoriteStatus
};
