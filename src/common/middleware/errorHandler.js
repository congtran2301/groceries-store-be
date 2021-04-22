import { error } from '../utils/response';

const errorHandler = (req, res) => {
  try {
  } catch (err) {
    return error({ res, message: err, statusCode: 400 });
  }
};

export default errorHandler;
