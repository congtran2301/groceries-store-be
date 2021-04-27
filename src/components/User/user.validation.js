import Joi from 'joi';
import RequestTypes from '../../common/requestTypes';

const userUpdate = {
  [RequestTypes.Body]: Joi.object({
    fullName: Joi.string(),
    avatar: Joi.string()
  })
};

export default { userUpdate };
