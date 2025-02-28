const { createTransaction, transferTransaction } = require("../models/Transaction")
const { pool } = require("../config/db")

const deposit = async(req, res) => {
    const { account_id,  amount} = req.body
    try{
        if(amount <= 0){
            return res.status(400).json({message: "Amount must be greater than zero"})
        }


        //Create Transaction
        const transaction = await createTransaction(account_id, 'deposit', amount)
        res.status(200).json(transaction)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

const withdraw = async(req, res) => {
    const { account_id, amount} = req.body
    try{
        if(amount <= 0){
            return res.status(400).json({message: 'Amount must be greater than zero'})
        }


        //Create transaction
        const transaction = await createTransaction(account_id, 'withdraw', amount)
        res.status(200).json(transaction)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const transfer = async(req, res) => {
    const {sender_account, receiver_account, amount} = req.body

    try{
        if(amount <= 0 || isNaN(amount)){
            return res.status(400).json({message: 'Invalid amount'})
        }
    
        const transaction = await transferTransaction(sender_account, receiver_account, amount)
        res.status(200).json(transaction)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {deposit, withdraw, transfer}