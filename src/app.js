const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes")
const accountRoutes = require('./routes/accountRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

app.use(express.json())
app.use('/users', userRoutes)
app.use('/accounts', accountRoutes)
app.use('/transactions', transactionRoutes)

module.exports = app