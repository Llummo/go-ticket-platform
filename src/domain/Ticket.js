class Ticket {
  constructor({ id, id_event, id_customer, id_payment, row_str, seat_number, price, status }) {
    this.id = id
    this.id_event = id_event
    this.id_customer = id_customer
    this.id_payment = id_payment
    this.row_str = row_str
    this.seat_number = seat_number
    this.price = price
    this.status = status || Ticket.AVAILABLE
  }
}

Ticket.AVAILABLE = 'AVAILABLE'
Ticket.SOLD = 'SOLD'

module.exports = Ticket
