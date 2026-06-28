const express = require('express')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('../../infrastructure/swagger/swaggerSpec')

const createServer = (routers) => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '../../../public')))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public', 'index.html'))
  })

  routers.forEach(router => app.use('/api', router))

  return app
}

module.exports = { createServer }
