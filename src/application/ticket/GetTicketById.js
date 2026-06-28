class GetTicketById {
  constructor(ticketRepo) {
    this.ticketRepo = ticketRepo
  }

  async execute(ticketId) {
    const t = await this.ticketRepo.findByIdWithDetails(ticketId)
    if (!t) return null
    return {
      id_ticket: t._id,
      row_str: t.row_str,
      seat_number: t.seat_number,
      price: t.price,
      status: t.status,
      event_title: t.id_event ? t.id_event.event_title : 'N/A',
      start_date: t.id_event ? t.id_event.start_date : 'N/A',
      image_url: t.id_event ? t.id_event.image_url : '',
      venue_name: (t.id_event && t.id_event.id_venue) ? t.id_event.id_venue.name : 'N/A',
      venue_address: (t.id_event && t.id_event.id_venue) ? t.id_event.id_venue.address : 'N/A',
      customer_name: t.id_customer ? t.id_customer.name : 'N/A',
      customer_email: t.id_customer ? t.id_customer.email : 'N/A'
    }
  }
}

module.exports = GetTicketById
