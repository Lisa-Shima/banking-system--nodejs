const bcrypt = require('bcrypt')
const { createUser, getUser } = require("../models/User")

const registerUser = async(req, res) => {
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }

        const salt = 10
        const hashedPassword = bcrypt.hash(password, salt)

        const newUser = await createUser(name, email, hashedPassword)
        res.status(200).json(newUser)
        }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const getUserById = async(req, res) => {
    try{
        const id = req.params.id

        const user = await getUser(id)

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        res.status(200).json(user)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = { registerUser, getUserById }