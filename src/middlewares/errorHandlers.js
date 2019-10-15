function displayErrors(err, req, res, next) {
  const {
    status = 500,
    name = 'Unexpected Error',
    message = 'An unexpected error occurred',
    errors,
  } = err

  res.status(status).json({
    success: false,
    name,
    message,
    errors,
  })
}

export {displayErrors}
