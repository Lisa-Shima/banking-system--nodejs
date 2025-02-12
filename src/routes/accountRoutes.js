const express = require('express')
const router = express.Router()
const { registerAccount, findAccounts, findAccountByAccountNumber } = require('../controllers/accountController')
const { protect } = require('../middlewares/auth')

router.post('/', protect, registerAccount)
router.get('/', protect, findAccounts)
router.get('/:account_number', protect, findAccountByAccountNumber)

module.exports = router