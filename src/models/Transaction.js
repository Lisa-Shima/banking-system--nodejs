const {pool} = require('../config/db')

const createTransaction = async (accountNumber, type, amount) => {
    const query = `
    INSERT INTO transactions (account_number, type, amount)
    VALUES ($1, $2, $3) RETURNING *;
    `

    if(type == 'deposit'){
        //Update balance
        await pool.query('UPDATE accounts SET balance = balance + $1 WHERE  account_number = $2', [amount, accountNumber])
    }
    else if(type == 'withdraw'){
        //Update balance
        await pool.query('UPDATE accounts SET balance = balance - $1 WHERE account_number = $2', [amount, accountNumber])
    }

    const result = await pool.query(query, [accountNumber, type, amount])
    return result.rows;
}

const transferTransaction = async (senderAccount, receiverAccount, amount) => {
    const senderQuery = `
    SELECT account_number, balance FROM accounts WHERE account_number = $1
    `
    const sender = await pool.query(senderQuery, [senderAccount])
    if(sender.rows.length == 0){
        throw new Error('Sender not found!')
    }

    if(sender.rows[0].balance < amount){
        throw new Error('Unsufficient funds!')
    }

    const receiverQuery = `
    SELECT account_number FROM accounts WHERE account_number = $1
    `
    const receiver = await pool.query(receiverQuery, [receiverAccount])

    if(receiver.rows.length == 0){
        throw new Error('Receiver not found!')
    }

    // Deduct money from sender
    await pool.query('UPDATE accounts SET balance = balance - $1 WHERE account_number = $2', [amount, senderAccount])

    // Add money to receiver
    await pool.query('UPDATE accounts SET  balance = balance + $1 WHERE account_number = $2', [amount, receiverAccount])

    // Create a transaction
    const transactionQuery = `
    INSERT INTO transactions (account_number, type, amount)
    VALUES
    ($1, 'transfer', $2),
    ($3, 'deposit', $2) RETURNING *; 
    `

    const transaction = await pool.query(transactionQuery, [senderAccount, amount, receiverAccount])
    return transaction.rows;
}

module.exports = { createTransaction, transferTransaction }