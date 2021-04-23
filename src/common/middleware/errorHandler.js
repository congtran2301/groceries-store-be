import { error } from '../utils/response';
import CustomError from '../CustomError';

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log('err instanceof CustomError');
    return error({
      res,
      message: err.message,
      statusCode: err.statusCode
    });
  }
  return error({
    res,
    message: 'Internal Server Error',
    statusCode: '500'
  });
};

export default errorHandler;
