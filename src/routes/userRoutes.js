const express = require("express")
const router = express.Router()
const { registerUser, getUserById, getAllUsers, updateUserById } = require("../controllers/userController")

router.post('/', registerUser)
router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.put('/:id', updateUserById)

module.exports = router