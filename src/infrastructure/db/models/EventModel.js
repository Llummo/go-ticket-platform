const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  event_title: String,
  description: String,
  image_url: String,
  start_date: Date,
  id_venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  id_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  id_organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Event', schema)
