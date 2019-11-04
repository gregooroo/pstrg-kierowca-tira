import {validateSearchRange, compareDates} from './middleware'
import Transit from '../../db/models/Transit'
import {catchErrors} from '../../utils/errorHandlers'
import {dateWithOrdinal} from '../../utils/date'

async function rangeReportsHandler(req, res, next) {
  const {start_date, end_date} = req.query

  const result = await Transit.findWithinDateRange(start_date, end_date)

  res.status(200).json({
    success: true,
    result,
  })
}

async function monthlyReportsHandler(req, res, next) {
  const result = await Transit.findWithinMonth()

  const formattedResult = result.map(({date, ...rest}) => {
    const formattedDate = dateWithOrdinal(date)
    return {date: formattedDate, ...rest}
  })

  res.status(200).json({
    success: true,
    result: formattedResult,
  })
}

export default {
  rangeReports: [
    validateSearchRange,
    compareDates,
    catchErrors(rangeReportsHandler),
  ],
  monthlyReports: [catchErrors(monthlyReportsHandler)],
}
