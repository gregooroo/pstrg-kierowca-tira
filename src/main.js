import 'dotenv/config'
import './db'
import app from './app'

const {PORT = null} = process.env

if (!PORT || !Number(PORT)) {
  console.error('Please specify port in .env file')
  process.exit()
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}`)
})
