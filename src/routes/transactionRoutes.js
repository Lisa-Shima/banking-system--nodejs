const express = require("express")
const router = express.Router()
const {deposit, withdraw} = require("../controllers/transactionController")
const {protect} = require("../middlewares/auth")

router.post('/dep', protect, deposit)
router.post('/with', protect, withdraw)

module.exports = router