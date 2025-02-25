const {pool} = require('../config/db')

const createTransaction = async (accountNumber, type, amount) => {
    const query = `
    INSERT INTO transactions (account_number, type, amount)
    VALUES ($1, $2, $3) RETURNING *;
    `

    const result = await pool.query(query, [accountNumber, type, amount])
    return result.rows;
}

module.exports = { createTransaction }