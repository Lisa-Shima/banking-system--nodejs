const express = require("express")
const router = express.Router()
const {deposit, withdraw, transfer} = require("../controllers/transactionController")
const {protect} = require("../middlewares/auth")

router.post('/dep', protect, deposit)
router.post('/with', protect, withdraw)
router.post('/transfer', protect, transfer)

module.exports = router