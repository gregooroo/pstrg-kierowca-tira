import {validationResult} from 'express-validator'
import {generateError} from '../utils/errorHandlers'

export function expressValidatorResult(req, res, next) {
  const errorFormatter = ({param, msg}) => {
    return {
      field: param,
      message: msg,
    }
  }

  const errors = validationResult(req).formatWith(errorFormatter)

  if (errors.isEmpty()) return next()

  console.log(errors.array())

  return next(
    generateError(400, 'ValidationError', 'Validation Failed', errors.array()),
  )
}
