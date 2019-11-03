import {Router} from 'express'
import transitsController from '../controllers/transits'
import reportsController from '../controllers/reports'

const router = Router()

router.post('/transits', transitsController.addTransit)

router.get('/reports/range', reportsController.rangeReports)
router.get('/reports/monthly', reportsController.monthlyReports)

export default router
