/**
 * Async / await error handling strategy
 *
 * This helper function is an alternative for try / catch blocks inside async functions.
 *
 * Example:
 *
 * async foo() {
 *    const [err, result] = await to(asyncTask())
 * }
 *
 * @param {Promise} promise
 */
function to(promise) {
  return promise.then(result => [null, result]).catch(error => [error, null])
}

function generateError(
  status = 500,
  name = 'Unexpected Error',
  message = '',
  errors = {},
) {
  const error = new Error(message)
  error.status = status
  error.name = name
  error.errors = errors
  return error
}

export {to, generateError}
