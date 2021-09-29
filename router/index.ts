import express from 'express'
import * as indexController from '../controller/index'

const router = express.Router()


router.get('/', indexController.getAll)

router.post('/', indexController.createUser)





export default router;