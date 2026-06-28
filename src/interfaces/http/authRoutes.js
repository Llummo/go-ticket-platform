const { Router } = require('express')

module.exports = (loginUseCase, registerUseCase) => {
  const router = Router()

  router.post('/auth/login', async (req, res) => {
    try {
      const result = await loginUseCase.execute(req.body)
      res.json(result)
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  })

  router.post('/auth/register', async (req, res) => {
    try {
      const result = await registerUseCase.execute(req.body)
      res.status(201).json({ message: 'Usuario registrado con éxito', user: result })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

  return router
}