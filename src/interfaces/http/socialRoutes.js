const { Router } = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'goticket_super_secret_key_2026'

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' })
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' })
  }
}

module.exports = (createPostUseCase, getEventFeedUseCase, getUserProfileUseCase) => {
  const router = Router()

  router.get('/events/:id/posts', async (req, res) => {
    try {
      res.json(await getEventFeedUseCase.execute(req.params.id))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.post('/events/:id/posts', authenticate, async (req, res) => {
    try {
      const result = await createPostUseCase.execute({
        id_user: req.user.id,
        id_event: req.params.id,
        ...req.body
      })
      res.status(201).json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

  router.get('/users/:id/profile', async (req, res) => {
    try {
      res.json(await getUserProfileUseCase.execute(req.params.id))
    } catch (err) {
      res.status(404).json({ error: err.message })
    }
  })

  return router
}