const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: String,
  name: String,
  role: String
})

module.exports = mongoose.model('User', schema)
