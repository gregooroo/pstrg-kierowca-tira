import {Router} from 'express'
import transitsController from '../controllers/transits'

const router = Router()

router.post('/transits', transitsController.addTransit)

export default router
