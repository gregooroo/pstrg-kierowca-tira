import {validateSearchRange, compareDates} from './middleware'
import Transit from '../../db/models/Transit'
import {catchErrors} from '../../utils/errorHandlers'
import {getMonthlyDateRange, dateWithOrdinal} from '../../utils/date'

async function rangeReportsHandler(req, res, next) {
  const {start_date, end_date} = req.query

  // TODO: Extract this as separate mongodb plugin
  const result = await Transit.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(start_date),
          $lte: new Date(end_date),
        },
      },
    },
    {
      $group: {
        _id: null,
        total_distance: {$sum: '$distance'},
        total_price: {$sum: '$price'},
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ])

  res.status(200).json({
    success: true,
    result,
  })
}

async function monthlyReportsHandler(req, res, next) {
  const [firstDay, lastDay] = getMonthlyDateRange(new Date())

  const result = await Transit.aggregate([
    {
      $match: {
        date: {
          $gte: firstDay,
          $lte: lastDay,
        },
      },
    },
    {
      $group: {
        _id: '$date',
        total_distance: {$sum: '$distance'},
        avg_distance: {$avg: '$distance'},
        avg_price: {$avg: '$price'},
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        total_distance: 1,
        avg_distance: 1,
        avg_price: 1,
      },
    },
  ])

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
