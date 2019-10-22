import {check} from 'express-validator'
import {isValidDateFormat} from '../../utils/date'
import {expressValidatorResult} from '../helpers'

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

  expressValidatorResult,
]

export {validateBody}
