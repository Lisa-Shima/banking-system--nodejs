const {pool} = require('../config/db')

pool.query(`
CREATE TABLE IF NOT EXISTS accounts (
id SERIAL PRIMARY KEY,
account_number VARCHAR(16) UNIQUE NOT NULL,
user_id INTEGER NOT NULL,
balance INTEGER DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
`)

const createAccount = async(userId, accountNumber) => {
    const query = `
    INSERT INTO accounts(user_id, account_number) VALUES ($1, $2) RETURNING *;
    `
    const result = await pool.query(query, [userId, accountNumber])
    return result.rows[0]
}

const getAccounts = async(userId) => {
    const query = `
    SELECT * FROM accounts WHERE user_id = $1;
    `
    const results = await pool.query(query, [userId])
    return results.rows
}

const getAccountByAccountNumber = async(userId, accountNumber) => {
    const query = `
    SELECT * FROM accounts WHERE user_id = $1 AND account_number = $2
    `
    const result = await pool.query(query, [userId, accountNumber])
    return result.rows[0]
}

const deleteAccountByAccountNumber = async(userId, accountNumber) => {
    const query = `
    DELETE FROM accounts WHERE user_id = $1 AND account_number = $2
    `

    const result = await pool.query(query, [userId, accountNumber])
    return {userId, accountNumber, message: "Account deleted successfully"}
}

module.exports = { createAccount, getAccounts, getAccountByAccountNumber, deleteAccountByAccountNumber }