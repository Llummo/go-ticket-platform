const Event = require('../../domain/Event')

class CreateEventWithTickets {
  constructor(eventRepo, ticketRepo) {
    this.eventRepo = eventRepo
    this.ticketRepo = ticketRepo
  }

  async execute({ id_venue, id_organizer, id_category, event_title, description, image_url, start_date, price_base }) {
    if (price_base !== undefined && price_base <= 0) throw new Error('El precio base debe ser mayor a 0')

    const event = new Event({ id_venue, id_organizer, id_category, event_title, description, image_url, start_date })

    const newEvent = await this.eventRepo.create(event)

    const rows = ['A', 'B', 'C', 'D']
    const ticketsToInsert = []
    rows.forEach(row => {
      for (let i = 1; i <= 10; i++) {
        ticketsToInsert.push({
          id_event: newEvent._id,
          row_str: row,
          seat_number: i,
          price: price_base || 100,
          status: 'AVAILABLE'
        })
      }
    })

    await this.ticketRepo.insertMany(ticketsToInsert)
    return { message: 'Evento creado y tickets generados', id_event: newEvent._id }
  }
}

module.exports = CreateEventWithTickets
