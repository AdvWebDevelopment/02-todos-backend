require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const todos = require('./app/router/todos.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', todos)

const port = process.env.PORT || 9999
app.listen(port)
console.log('Server is running on port: ' + port)
