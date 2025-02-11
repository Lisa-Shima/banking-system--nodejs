const bcrypt = require('bcrypt')
const { createUser, getUser, getUsers, updateUser, deleteUser, getUserByEmail } = require("../models/User")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

const hashPassword = async(password) => {
    const salt = 10
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const registerUser = async(req, res) => {
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }

        const hashedPassword = hashPassword(password)

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

const getAllUsers = async(req, res) => {
    try{
        const users = await getUsers()
        res.status(200).json(users)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const updateUserById = async(req, res) => {
    const id = req.params.id
    const {name, email, password} = req.body
    const hashedPassword = hashPassword(password)

    try{
        const user = await updateUser(id, name, email, hashedPassword)

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

const deleteUserById = async(req, res) => {
    const id = req.params.id

    try{
        const user = await deleteUser(id)
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

const login = async(req, res) => {
    try{
        const { email, password } = req.body    
        const user = await getUserByEmail(email)

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(401).json({message: 'Invalid password'})
        }

        const token = await generateToken(user._id)
        res.status(200).json({user: {id: user.id, name: user.name, email: user.email}, token})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = { registerUser, getUserById, getAllUsers, updateUserById, deleteUserById, login }