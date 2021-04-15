import Joi from 'joi';

const UserRegister = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .message('Your password must be between 8 and 30 characters'),
  fullName: Joi.string().required()
});
const UserLogin = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .message('Your password must be between 8 and 30 characters')
});

const UserUpdate = Joi.object({
  fullName: Joi.string(),
  avatar: Joi.string()
});

export default { UserRegister, UserLogin, UserUpdate };
