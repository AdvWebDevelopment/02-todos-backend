const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: String,
  hash_password: String
})

module.exports = mongoose.model('User', User)
