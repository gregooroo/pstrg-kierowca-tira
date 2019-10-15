import Transit from '../../db/models/Transit'
import {to} from '../../utils/errorHandlers'
import {validateBody} from './middleware'

async function addTransitHandler(req, res, next) {
  const transit = new Transit(req.body)
  const [err, result] = await to(transit.save())

  if (err) return next(err)

  res.status(200).json({
    success: true,
    result,
  })
}

export default {
  addTransit: [validateBody, addTransitHandler],
}
