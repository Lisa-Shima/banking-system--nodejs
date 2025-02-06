const express = require("express")
const router = express.Router()
const { registerUser, getUserById, getAllUsers } = require("../controllers/userController")

router.post('/', registerUser)
router.get('/:id', getUserById)
router.get('/', getAllUsers)

module.exports = router