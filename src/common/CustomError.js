class CustomError {
  constructor(message, statusCode) {
    (this.message = message), (this.statusCode = statusCode);
  }
}

export default CustomError;
