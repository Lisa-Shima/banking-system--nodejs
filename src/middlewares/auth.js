const jwt = require('jsonwebtoken')
const { getUser } = require('../models/User')

const protect = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await getUser(decoded.id)
            next()
        }
        catch(err){
            res.status(401).json({message: 'Not authorized!'})
        }
    }
    if(!token){
        return res.status(401).json({message: 'No token provided!'})
    }
}

module.exports = { protect }