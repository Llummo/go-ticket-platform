const { Router } = require('express')

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id)

module.exports = (getTicketsByEventUseCase, getTicketByIdUseCase, getCustomerTicketsUseCase, createTicketUseCase, deleteTicketUseCase) => {
  const router = Router()

  // Middleware para validar IDs en rutas que lleven /:id
  const validateIdParam = (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'El ID proporcionado no tiene un formato válido' })
    }
    next()
  }

  // GET: Tickets por evento
  router.get('/events/:id/tickets', validateIdParam, async (req, res) => {
    try {
      res.json(await getTicketsByEventUseCase.execute(req.params.id))
    } catch {
      res.status(500).json({ error: 'Error en la consulta' })
    }
  })

  // GET: Ticket por ID
  router.get('/tickets/:id', validateIdParam, async (req, res) => {
    try {
      const result = await getTicketByIdUseCase.execute(req.params.id)
      if (!result) return res.status(404).json({ message: 'Ticket no encontrado' })
      res.json(result)
    } catch {
      res.status(500).json({ error: 'Error en la consulta del ticket' })
    }
  })

  // GET: Tickets de un cliente
  router.get('/customer/:id/tickets', validateIdParam, async (req, res) => {
    try {
      res.json(await getCustomerTicketsUseCase.execute(req.params.id))
    } catch {
      res.status(500).json({ error: 'Error al obtener mis entradas' })
    }
  })

  router.post('/tickets', async (req, res) => {
    try {
      const { id_event, row_str, seat_number, price } = req.body

      
      if (!id_event || !price) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: id_event y price' })
      }
      
      if (!isValidObjectId(id_event)) {
        return res.status(400).json({ error: 'El id_event proporcionado no es un ObjectId válido' })
      }

      const newTicket = await createTicketUseCase.execute({ id_event, row_str, seat_number, price })
      
      return res.status(201).json(newTicket)
    } catch (error) {
      return res.status(422).json({ error: error.message })
    }
  })

  router.delete('/tickets/:id', validateIdParam, async (req, res) => {
    try {
      const result = await deleteTicketUseCase.execute(req.params.id)
      return res.json(result)
    } catch (error) {
      if (error.message.includes("vendido")) return res.status(422).json({ error: error.message })
      if (error.message.includes("no existe")) return res.status(404).json({ error: error.message })
      return res.status(500).json({ error: "Error interno al eliminar el ticket" })
    }
  })

  return router
}