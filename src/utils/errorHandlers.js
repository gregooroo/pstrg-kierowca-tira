/**
 * Async / await error handling strategy
 *
 * Instead of using try / catch block inside particular route handler we can wrap entire handler with this helper.
 * When error occurs this helper automatically catch it and move down into middleware chain
 *
 * Example:
 *
 * // Controller file
 *
 * async function someRouteHandler(req, res, next) {
 *  const result = await someAsyncStuff()
 *
 *  res.status(200).json(result)
 * }
 *
 * // Router file
 *
 * router.get('/route', catchErrors(somerouteHandler))
 *
 * @param {Function} fn
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next)
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

export {catchErrors, generateError}
