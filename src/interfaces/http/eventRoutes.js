const { Router } = require('express')

module.exports = (getEventsUseCase, createEventWithTicketsUseCase, updateEventUseCase) => {
  const router = Router()

  router.get('/events', async (req, res) => {
    try {
      console.log('-> Llamando a /api/events')
      res.json(await getEventsUseCase.execute())
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.post('/admin/events-with-tickets', async (req, res) => {
    const { event_title, start_date, id_venue, id_category, id_organizer } = req.body

    if (!event_title || !start_date || !id_venue || !id_category || !id_organizer) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: event_title, start_date, id_venue, id_category, id_organizer' })
    }

    try {
      res.json(await createEventWithTicketsUseCase.execute(req.body))
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

  router.put('/events/:id', async (req, res) => {
    try {
      const result = await updateEventUseCase.execute(req.params.id, req.body)
      if (!result) return res.status(404).json({ message: 'Evento no encontrado' })
      res.json(result)
    } catch {
      res.status(500).json({ error: 'Error al actualizar' })
    }
  })

  return router
}
