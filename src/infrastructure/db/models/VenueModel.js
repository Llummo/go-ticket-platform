const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  address: String
})

module.exports = mongoose.model('Venue', schema)
