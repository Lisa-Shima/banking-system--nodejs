const express = require('express')
const router = express.Router()
const { registerAccount, findAccounts, findAccountByAccountNumber, deleteAccountUsingAccountNumber } = require('../controllers/accountController')
const { protect } = require('../middlewares/auth')

router.post('/', protect, registerAccount)
router.get('/', protect, findAccounts)
router.get('/:account_number', protect, findAccountByAccountNumber)
router.delete('/:account_number', protect, deleteAccountUsingAccountNumber)

module.exports = router