import Joi from 'joi';
import RequestTypes from '../../common/requestTypes';

const userRegister = {
  [RequestTypes.Body]: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message('Your password must be between 8 and 30 characters'),
    fullName: Joi.string().required()
  })
};
const userLogin = {
  [RequestTypes.Body]: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message('Your password must be between 8 and 30 characters')
  })
};

export default {
  userRegister,
  userLogin
};
