import {validateSearchRange, compareDates} from './middleware'
import Transit from '../../db/models/Transit'
import {catchErrors} from '../../utils/errorHandlers'

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

export default {
  rangeReports: [
    validateSearchRange,
    compareDates,
    catchErrors(rangeReportsHandler),
  ],
}
