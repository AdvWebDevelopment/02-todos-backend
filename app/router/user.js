const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/todo`, { useMongoClient: true })
const User = require('../models/user.js')

router.post('/signup', (request, response) => {
  let body = request.body
  body.hash_password = passwordHash.generate(body.password)

  User.find({email: body.email}).then((user) => {
    if (user.length) {
      response.status(400)
      response.json({error: 'user aleady exist'})
    } else {
      const newUser = new User(body)
      newUser.save((err, newUser) => {
        if (err) {
          response.status(500)
          response.json(err)
        } else {
          const token = jwt.sign({user_id: user._id}, process.env.JWT_SECRET)
          response.json({jwt_token: token})
        }
      })
    }
  })
})

module.exports = router
