class GetTicketsByEvent {
  constructor(ticketRepo) {
    this.ticketRepo = ticketRepo
  }

  async execute(eventId) {
    const tickets = await this.ticketRepo.findByEvent(eventId)
    return tickets.map(t => ({
      id_ticket: t._id,
      row_str: t.row_str,
      seat_number: t.seat_number,
      price: t.price,
      status: t.status
    }))
  }
}

module.exports = GetTicketsByEvent
