const { createAccount, getAccounts, getAccountByAccountNumber } = require('../models/Account')
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

const findAccounts = async(req, res) => {
    const userId = req.user.id
    try{
        const accounts = await getAccounts(userId)
        if(!accounts) {
            return res.status(200).json({message: 'You have no accounts created'})
        }
        res.status(200).json(accounts)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const findAccountByAccountNumber = async(req, res) => {
    const userId = req.user.id
    const accountNumber = req.params.account_number
    try{
        const account = await getAccountByAccountNumber(userId, accountNumber)
        if(!account){
            return res.status(200).json({message: 'Account not found'})
        }
        res.status(200).json(account)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = { registerAccount, findAccounts, findAccountByAccountNumber }