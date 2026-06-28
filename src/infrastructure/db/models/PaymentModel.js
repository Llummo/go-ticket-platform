const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  total_amount: Number,
  payment_date: { type: Date, default: Date.now },
  method: String,
  operation_code: String
})

module.exports = mongoose.model('Payment', schema)
