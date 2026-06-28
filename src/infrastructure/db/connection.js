const mongoose = require('mongoose')

const mongoURI = 'mongodb://admin:secreta@localhost:27017/goticket_social?authSource=admin'

const connect = async () => {
  mongoose.set('bufferCommands', false)
  await mongoose.connect(mongoURI)
  console.log('¡Conexión exitosa a MongoDB (Contenedor Docker)!')
}

module.exports = { connect }
