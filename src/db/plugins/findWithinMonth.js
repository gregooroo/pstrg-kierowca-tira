import {getMonthlyDateRange} from '../../utils/date'

function findWithinMonth() {
  const [firstDay, lastDay] = getMonthlyDateRange(new Date())

  return this.aggregate([
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
}

export default function findWithinMonthPlugin(schema, options) {
  schema.statics.findWithinMonth = findWithinMonth
}
