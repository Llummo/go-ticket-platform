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

    this.validate()
  }
  validate() {
    if (!this.id_event) {
      throw new Error("El ticket debe estar asociado a un evento obligatoriamente.");
    }
    if (this.price === undefined || this.price < 0) {
      throw new Error("El precio del ticket no puede ser negativo ni nulo.");
    }
    if (this.seat_number !== undefined && this.seat_number <= 0) {
      throw new Error("El número de asiento debe ser mayor a 0.");
    }
    if (![Ticket.AVAILABLE, Ticket.SOLD].includes(this.status)) {
      throw new Error(`Estado de ticket inválido: ${this.status}`);
    }
  }

  assignToCustomer(customerId, paymentId) {
    if (this.status === Ticket.SOLD) {
      throw new Error("Este ticket ya ha sido vendido.");
    }
    this.id_customer = customerId;
    this.id_payment = paymentId;
    this.status = Ticket.SOLD;
  }

canBeDeleted() {
  if (this.status === Ticket.SOLD) {
    throw new Error("No se puede eliminar un ticket que ya ha sido vendido. Debe ser cancelado o reembolsado primero.");
  }
  return true;
}
}

Ticket.AVAILABLE = 'AVAILABLE'
Ticket.SOLD = 'SOLD'

module.exports = Ticket
