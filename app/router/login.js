const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/todo`, { useMongoClient: true })
const User = require('../models/user.js')

router.post('/', (request, response) => {
  const body = request.body
  User.findOne({email: body.email}).then(user => {
    if (user && passwordHash.verify(body.password, user.hash_password)) {
      const token = jwt.sign({user_id: user._id}, process.env.JWT_SECRET)
      response.json({jwt_token: token})
    } else {
      response.status(401)
      response.json(null)
    }
  })
})

module.exports = router
