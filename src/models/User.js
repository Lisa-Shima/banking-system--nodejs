const {pool} = require("../config/db")

const createUser = async(name, email, password) => {
    const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING id, name, email;
    `
    const values = [name, email, password]
    const result = await pool.query(query, values)
    return result.rows[0]
}

const getUser = async(id) => {
    const query = `
    SELECT id, name, email FROM users
    WHERE id = $1
    `
    const value = [id]
    const result = await pool.query(query, value)
    return result.rows[0]
}

const getUsers = async() => {
    const query = `
    SELECT * FROM users
    `

    const result = await pool.query(query)
    return result.rows
}

module.exports = { createUser, getUser, getUsers }