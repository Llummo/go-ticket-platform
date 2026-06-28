const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/goticket_social'

const connect = async () => {
  mongoose.set('bufferCommands', false)
  try {
    await mongoose.connect(mongoURI)
    console.log('Successful local DB connection')
  } catch (error) {
    console.error('Failed local DB connection:', error.message)
    process.exit(1)
  }
}

module.exports = { connect }