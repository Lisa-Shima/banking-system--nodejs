const express = require('express')
const router = express.Router()
const { registerAccount } = require('../controllers/accountController')
const { protect } = require('../middlewares/auth')

router.post('/', protect, registerAccount)

module.exports = router