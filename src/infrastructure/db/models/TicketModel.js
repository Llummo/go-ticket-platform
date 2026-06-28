const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id_event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  id_customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  id_payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null },
  row_str: String,
  seat_number: Number,
  price: Number,
  status: { type: String, default: 'AVAILABLE' }
})

module.exports = mongoose.model('Ticket', schema)
