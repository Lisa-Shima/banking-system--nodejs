const express = require('express')
const router = express.Router()
const { registerAccount, findAccounts } = require('../controllers/accountController')
const { protect } = require('../middlewares/auth')

router.post('/', protect, registerAccount)
router.get('/', protect, findAccounts)

module.exports = router