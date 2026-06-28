const { Router } = require('express')

module.exports = (getTicketsByEventUseCase, getTicketByIdUseCase, getCustomerTicketsUseCase) => {
  const router = Router()

  router.get('/events/:id/tickets', async (req, res) => {
    try {
      res.json(await getTicketsByEventUseCase.execute(req.params.id))
    } catch {
      res.status(500).json({ error: 'Error en la consulta' })
    }
  })

  router.get('/tickets/:id', async (req, res) => {
    try {
      const result = await getTicketByIdUseCase.execute(req.params.id)
      if (!result) return res.status(404).json({ message: 'Ticket no encontrado' })
      res.json(result)
    } catch {
      res.status(500).json({ error: 'Error en la consulta del ticket' })
    }
  })

  router.get('/customer/:id/tickets', async (req, res) => {
    try {
      res.json(await getCustomerTicketsUseCase.execute(req.params.id))
    } catch {
      res.status(500).json({ error: 'Error al obtener mis entradas' })
    }
  })

  return router
}
