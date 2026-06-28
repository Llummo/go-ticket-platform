const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'cliente' },
  avatar: { type: String, default: 'https://ui-avatars.com/api/?name=User&background=random' },
  bio: { type: String, default: '¡Hola! Uso GoTicket.' }
})

module.exports = mongoose.model('User', schema)