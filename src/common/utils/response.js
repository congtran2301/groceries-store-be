const success = ({
  res,
  message,
  data = null,
  pagination = {},
  statusCode
}) => {
  return res.send({
    message,
    error: false,
    code: statusCode,
    payload: data,
    pagination
  })
}

const error = ({ res, message, statusCode }) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500]

  // Get matched code
  const findCode = codes.find((code) => code == statusCode)

  if (!findCode) statusCode = 500
  else statusCode = findCode

  return res.send({
    message,
    code: statusCode,
    error: true
  })
}
const unauthorized = ({ res }) => {
  return res.send({
    message: 'Authorization errors',
    error: true,
    code: 401
  })
}
export { success, error, unauthorized }
