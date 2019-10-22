import Transit from '../../db/models/Transit'
import {validateBody} from './middleware'
import {catchErrors} from '../../utils/errorHandlers'

async function addTransitHandler(req, res, next) {
  const transit = new Transit(req.body)
  const result = await transit.save()

  res.status(200).json({
    success: true,
    result,
  })
}

export default {
  addTransit: [validateBody, catchErrors(addTransitHandler)],
}
