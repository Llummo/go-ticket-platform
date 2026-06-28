const { Router } = require('express')

module.exports = (loginUseCase) => {
  const router = Router()

  router.post('/auth/login', async (req, res) => {
    try {
      const result = await loginUseCase.execute(req.body)
      if (!result) return res.status(401).json({ error: 'Usuario no encontrado en la base de datos' })
      res.json(result)
    } catch {
      res.status(500).json({ error: 'Error en BD' })
    }
  })

  return router
}
