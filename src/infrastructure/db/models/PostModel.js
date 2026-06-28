const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  id_event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: null },
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', schema)