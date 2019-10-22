import {Router} from 'express'
import transitsController from '../controllers/transits'
import reportsController from '../controllers/reports'

const router = Router()

router.post('/transits', transitsController.addTransit)

router.get('/reports/range', reportsController.rangeReports)

export default router
