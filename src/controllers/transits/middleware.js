import {check, validationResult} from 'express-validator'
import {isValidDateFormat} from '../../utils/date'
import {generateError} from '../../utils/errorHandlers'

const validateBody = [
  check('source_address')
    .not()
    .isEmpty()
    .withMessage('Source address is required')
    .trim()
    .isString()
    .withMessage('Source address must be a string'),

  check('destination_address')
    .not()
    .isEmpty()
    .withMessage('Destination address is required')
    .trim()
    .isString()
    .withMessage('Destination address must be a string'),

  check('price')
    .not()
    .isEmpty()
    .withMessage('Price is required')
    .isInt()
    .withMessage('Price must be a number')
    .toInt(),

  check('date')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Price is required')
    .custom(isValidDateFormat)
    .withMessage('Invalid date or invalid date format. Please use YYYY-MM-DD'),

  function validate(req, res, next) {
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
      generateError(
        400,
        'ValidationError',
        'Validation Failed',
        errors.array(),
      ),
    )
  },
]

export {validateBody}
