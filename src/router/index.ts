import express from 'express'
import * as indexController from '../controller/index'
import rateLimit from '../middleware/limit'
const router = express.Router()


router.get('/',rateLimit, indexController.getAll)

router.post('/',rateLimit, indexController.createUser)





export default router;