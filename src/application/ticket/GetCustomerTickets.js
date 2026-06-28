class GetCustomerTickets {
  constructor(ticketRepo) {
    this.ticketRepo = ticketRepo
  }

  async execute(customerId) {
    const tickets = await this.ticketRepo.findByCustomer(customerId)
    return tickets.map(t => ({
      id_ticket: t._id,
      row_str: t.row_str,
      seat_number: t.seat_number,
      price: t.price,
      event_title: t.id_event ? t.id_event.event_title : 'N/A',
      start_date: t.id_event ? t.id_event.start_date : 'N/A',
      image_url: t.id_event ? t.id_event.image_url : '',
      venue_name: (t.id_event && t.id_event.id_venue) ? t.id_event.id_venue.name : 'N/A'
    }))
  }
}

module.exports = GetCustomerTickets
