const express = require('express')
const router = express.Router()

const dashboardController  = require('../controllers/users')


router.post('/login', dashboardController.userLogin)
router.post('/register', dashboardController.userRegister)
router.post('/dashboard', dashboardController.generatePasswords)

router.get('/passwords', dashboardController.loadPassword)
router.delete('/passwords/delete/:id', dashboardController.passwordDelete)


module.exports = router