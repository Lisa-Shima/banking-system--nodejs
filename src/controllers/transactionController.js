const { createTransaction } = require("../models/Transaction")
const { pool } = require("../config/db")

const deposit = async(req, res) => {
    const { account_id,  amount} = req.body
    try{
        if(amount <= 0){
            return res.status(400).json({message: "Amount must be greater than zero"})
        }

        //Update balance
        await pool.query('UPDATE accounts SET balance = balance + $1 WHERE  account_number = $2', [amount, account_id])

        //Create Transaction
        const transaction = await createTransaction(account_id, 'deposit', amount)
        res.status(200).json(transaction)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = {deposit}