const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.MONGO_HOST}/todo`, { useMongoClient: true })
const Todo = require('../models/todo.js')

router.get('/', (request, response) => {
  Todo.find().then(todos => {
    response.json({todos})
  })
})

router.post('/', (request, response) => {
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

router.put('/:id', (request, response) => {
  const body = request.body
  const id = request.params.id
  Todo.findById(id, (err, todo) => {
    if (err) {
      response.json(err)
    } else {
      todo.set(body)
      todo.save((err, updatedTodo) => {
        if (err) {
          response.json(err)
        } else {
          response.json(updatedTodo)
        }
      })
    }
  })
})

router.delete('/:id', (request, response) => {
  const id = request.params.id
  Todo.findById(id, (err, todo) => {
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

module.exports = router
