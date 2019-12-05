import mongoose from 'mongoose'

const {MONGODB_URI} = process.env

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error: '))
db.once('open', function connectionEstablished() {
  const {name, port} = this
  console.log(`Database is running on port ${port} - database name: ${name}`)
})

export default db
