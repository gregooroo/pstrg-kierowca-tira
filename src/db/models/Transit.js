import {Schema, model} from 'mongoose'
import mapbox from '../../mapbox'
import {generateError} from '../../utils/errorHandlers'
import findWithinMonthPlugin from '../plugins/findWithinMonth'
import findWithinDateRangePlugin from '../plugins/findWithinDateRange'

const TransitSchema = new Schema({
  source_address: {
    type: String,
    required: [true, 'Source address is required'],
    trim: true,
  },
  destination_address: {
    type: String,
    required: [true, 'Destination address is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  distance: {
    type: Number,
    default: 0,
  },
})

TransitSchema.plugin(findWithinDateRangePlugin)
TransitSchema.plugin(findWithinMonthPlugin)

TransitSchema.pre('save', function calculateDistance(next) {
  const {source_address, destination_address} = this

  mapbox(source_address, destination_address)
    .then(dist => {
      this.distance = dist / 1000 // We want distance in kilometers
      return next()
    })
    .catch(errors => {
      const {status, name, message, ...details} = errors
      next(generateError(status, name, message, details))
    })
})

export default model('Transit', TransitSchema)
