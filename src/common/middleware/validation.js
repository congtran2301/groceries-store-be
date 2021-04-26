import { success, error } from '../utils/response';

const validation = (validations) => {
  return async (req, res, next) => {
    try {
      Object.keys(validations).forEach((validation) => {
        let validationResult = validations[validation].validate(
          req[validation]
        );
        if (validationResult.error) {
          throw new Error(validationResult.error);
        }
      });
      next();
    } catch (err) {
      return error({ res, message: err.message, statusCode: 400 });
    }
  };
};

export default validation;
