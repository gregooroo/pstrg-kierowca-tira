import {check} from 'express-validator'
import {isValidDateFormat} from '../../utils/date'
import {expressValidatorResult} from '../helpers'
import {generateError} from '../../utils/errorHandlers'

const validateSearchRange = [
  check('start_date')
    .not()
    .isEmpty()
    .withMessage('Start date is required')
    .custom(isValidDateFormat)
    .withMessage('Wrong date format'),

  check('end_date')
    .not()
    .isEmpty()
    .withMessage('End date is required')
    .custom(isValidDateFormat)
    .withMessage('Wrong date format'),

  expressValidatorResult,
]

function compareDates(req, res, next) {
  const {start_date, end_date} = req.query

  if (new Date(start_date) > new Date(end_date))
    return next(
      generateError(400, 'Bad Request', 'Start date is greater than end date', {
        start_date,
        end_date,
      }),
    )

  return next()
}

export {validateSearchRange, compareDates}
