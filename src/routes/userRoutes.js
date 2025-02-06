const express = require("express")
const router = express.Router()
const { registerUser, getUserById, getAllUsers, updateUserById, deleteUserById } = require("../controllers/userController")

router.post('/', registerUser)
router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)

module.exports = router