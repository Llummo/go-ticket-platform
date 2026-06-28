const { Router } = require('express')

module.exports = (getVenuesUseCase, getCategoriesUseCase) => {
  const router = Router()

  router.get('/venues', async (req, res) => {
    try {
      res.json(await getVenuesUseCase.execute())
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.get('/categories', async (req, res) => {
    try {
      res.json(await getCategoriesUseCase.execute())
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  return router
}
