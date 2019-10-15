import {Schema, model} from 'mongoose'

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
})

export default model('Transit', TransitSchema)
