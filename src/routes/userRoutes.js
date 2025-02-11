const express = require("express")
const router = express.Router()
const { registerUser, getUserById, getAllUsers, updateUserById, deleteUserById, login } = require("../controllers/userController")

router.post('/', registerUser)
router.post('/login', login)
router.get('/:id', getUserById)
router.get('/', getAllUsers)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)

module.exports = router