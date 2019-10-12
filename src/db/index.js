import mongoose from 'mongoose'

const {DB_HOST, DB_PORT, DB_NAME} = process.env

const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error: '))
db.once('open', function connectionEstablished() {
  const {name, port} = this
  console.log(`Database is running on port ${port} - database name: ${name}`)
})

export default db
