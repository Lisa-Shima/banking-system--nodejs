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

const updateUser = async(id, name, email, password) => {
    const query = `
    UPDATE users SET name = $1, email = $2, password = $3
    WHERE id = $4
    `

    const values = [name, email, password, id]
    const result = await pool.query(query, values)
    return {id, name, email, password}
}

const deleteUser = async(id) => {
    const query = `
    DELETE FROM users
    WHERE id = $1
    `
    const values = [id]
    const result = await pool.query(query, values)
    return {id, message: "User deleted successfully"}
}

const getUserByEmail = async(email) => {
    const query = `
    SELECT * FROM users WHERE email = $1
    `
    const result = await pool.query(query, [email])
    return result.rows[0]
}

module.exports = { createUser, getUser, getUsers, updateUser, deleteUser, getUserByEmail }