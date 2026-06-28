const { Router } = require('express')

module.exports = (getTransactionsUseCase) => {
  const router = Router()

  router.get('/admin/transactions', async (req, res) => {
    try {
      res.json(await getTransactionsUseCase.execute())
    } catch {
      res.status(500).json({ error: 'Error al obtener el historial' })
    }
  })

  return router
}
