const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

const dashboardController  = require('../controllers/users')


router.post('/login', dashboardController.userLogin)
router.post('/register', dashboardController.userRegister)
router.post('/dashboard', verifyToken, dashboardController.generatePasswords)

router.get('/passwords', verifyToken, dashboardController.loadPassword)
router.delete('/passwords/delete/:id', dashboardController.passwordDelete)

router.delete('/user/delete', verifyToken,  dashboardController.deleteUser )

router.post('/reset-password', dashboardController.resetPasswordRequest)
router.post('/update-password', dashboardController.updatePassword)


module.exports = router
