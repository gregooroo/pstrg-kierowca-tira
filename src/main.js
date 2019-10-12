import 'dotenv/config'
import './db'
import app from './app'

const {APP_PORT = null} = process.env

if (!APP_PORT || !Number(APP_PORT)) {
  console.error('Please specify port in .env file')
  process.exit()
}

const server = app.listen(3000, () => {
  console.log(`Server is running on port ${server.address().port}`)
})
