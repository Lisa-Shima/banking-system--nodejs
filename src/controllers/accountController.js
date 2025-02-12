const { createAccount } = require('../models/Account')
const crypto = require('crypto')

const registerAccount = async(req, res) => {
    const userId = req.user.id
    const user = req.user

    const accountNumber = crypto.randomBytes(8).toString('hex')
    try{
        const account = await createAccount(userId, accountNumber)
        res.status(200).json({user, account})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = { registerAccount }