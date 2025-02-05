const express = require("express")
const router = express.Router()
const { registerUser, getUserById } = require("../controllers/userController")

router.post('/', registerUser)
router.get('/:id', getUserById)

module.exports = router