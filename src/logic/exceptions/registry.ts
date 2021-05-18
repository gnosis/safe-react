/**
 * When creating a new error type, please try to group them semantically
 * with the existing errors in the same hundred. For example, if it's
 * related to fetching data from the backend, add it to the 6xx errors.
 * This is not a hard requirement, just a useful convention.
 *
 * Important: the error descriptions must be unique
 */
enum ErrorCodes {
  _0 = 'No such error code',
  _100 = 'Invalid input in the address field',
  _600 = 'Error fetching token list',
  _601 = 'Error fetching balances',
}

export default ErrorCodes
