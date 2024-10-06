const express = require('express')
const router = express.Router()

const dashboardController  = require('../controllers/users')


router.post('/login', dashboardController.userLogin)
router.post('/register', dashboardController.userRegister)





module.exports = router