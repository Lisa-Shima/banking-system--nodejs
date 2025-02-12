const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes")
const accountRoutes = require('./routes/accountRoutes')

app.use(express.json())
app.use('/users', userRoutes)
app.use('/accounts', accountRoutes)

module.exports = app