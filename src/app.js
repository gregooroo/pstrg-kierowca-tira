import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import * as errorHandlers from './middlewares/errorHandlers'

const app = express()

app.use(bodyParser.json())
app.use('/', routes)
app.use(errorHandlers.displayErrors)

export default app
