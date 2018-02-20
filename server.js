require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var jwt = require('express-jwt')

const todos = require('./app/router/todos.js')
const user = require('./app/router/user.js')
const login = require('./app/router/login.js')

app.use(jwt({ secret: process.env.JWT_SECRET }).unless({path: ['/login', '/signup']}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/todos', todos)
app.use('/', user)
app.use('/login', login)

const port = process.env.PORT || 9999
app.listen(port)
console.log('Server is running on port: ' + port)
