const express = require("express")
const router = express.Router()
const {deposit} = require("../controllers/transactionController")
const {protect} = require("../middlewares/auth")

router.post('/', protect, deposit)

module.exports = router