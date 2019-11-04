function findWithinDateRange(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
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
}

export default function findWithinDateRangePlugin(schema, options) {
  schema.statics.findWithinDateRange = findWithinDateRange
}
