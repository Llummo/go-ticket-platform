class GetTransactions {
  constructor(historyRepo) {
    this.historyRepo = historyRepo
  }

  async execute() {
    const history = await this.historyRepo.findAllWithDetails()
    return history.map(h => ({
      id_history: h._id,
      action_date: h.action_date,
      action_type: h.action_type,
      id_ticket: h.id_ticket ? h.id_ticket._id : 'N/A',
      row_str: h.id_ticket ? h.id_ticket.row_str : 'N/A',
      seat_number: h.id_ticket ? h.id_ticket.seat_number : 'N/A',
      price: h.id_ticket ? h.id_ticket.price : 'N/A',
      event_title: (h.id_ticket && h.id_ticket.id_event) ? h.id_ticket.id_event.event_title : 'N/A',
      customer_name: h.id_customer ? h.id_customer.name : 'N/A',
      customer_email: h.id_customer ? h.id_customer.email : 'N/A',
      method: (h.id_ticket && h.id_ticket.id_payment) ? h.id_ticket.id_payment.method : 'N/A',
      operation_code: (h.id_ticket && h.id_ticket.id_payment) ? h.id_ticket.id_payment.operation_code : 'N/A'
    }))
  }
}

module.exports = GetTransactions
