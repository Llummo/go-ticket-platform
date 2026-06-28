const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id_ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  id_customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action_type: String,
  action_date: { type: Date, default: Date.now },
  details: String
})

module.exports = mongoose.model('History', schema)
