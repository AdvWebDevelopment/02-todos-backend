require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/Todo`, { useMongoClient: true })
const port = process.env.PORT || 9999
const Todo = require('./app/models/todo')

app.get('/todos', (request, response) => {
  Todo.find().then(todos => {
    response.json({todos})
  })
})

app.post('/todos', (request, response) => {
  const body = request.body
  const todo = new Todo(body)
  todo.save((err, todo) => {
    if (err) {
      response.json(err)
    } else {
      response.json(todo)
    }
  })
})

app.put('/todos/:id', (request, response) => {
  const body = request.body
  const id = request.params.id
  Todo.findById(id, function (err, todo) {
    if (err) {
      response.json(err)
    } else {
      todo.set(body)
      todo.save(function (err, updatedTodo) {
        if (err) {
          response.json(err)
        } else {
          response.json(updatedTodo)
        }
      })
    }
  })
})

app.delete('/todos/:id', (request, response) => {
  const id = request.params.id
  Todo.findById(id, function (err, todo) {
    if (err) {
      response.json(err)
    } else {
      todo.remove((err, removedTodo) => {
        if (err) {
          response.json(err)
        } else {
          response.json(removedTodo)
        }
      })
    }
  })
})

app.listen(port)
console.log('Server is running on port: ' + port)
