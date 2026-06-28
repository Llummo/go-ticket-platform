const { Router } = require('express')

module.exports = (purchaseTicketUseCase) => {
  const router = Router()

  router.post('/purchase', async (req, res) => {
    try {
      res.json(await purchaseTicketUseCase.execute(req.body))
    } catch (err) {
      res.status(500).json({ error: 'Error procesando la compra', details: err.message })
    }
  })

  return router
}
