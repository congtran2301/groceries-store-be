import express from 'express'
const router = express.Router()
import authController from './auth.controller'

router.post('/register', authController.register)
router.post('/login', authController.login)

export default router
