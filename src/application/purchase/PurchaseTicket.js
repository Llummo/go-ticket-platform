const Ticket = require('../../domain/Ticket'); // Asegúrate de ajustar la ruta relativa

class PurchaseTicket {
  constructor(paymentRepo, ticketRepo, historyRepo) {
    this.paymentRepo = paymentRepo;
    this.ticketRepo = ticketRepo;
    this.historyRepo = historyRepo;
  }

  async execute({ id_customer, id_ticket, total_amount, method, operation_code }) {

    const ticketDoc = await this.ticketRepo.model.findById(id_ticket);
    if (!ticketDoc) {
      throw new Error("El ticket solicitado no existe.");
    }
        const ticket = this.ticketRepo._toDomain(ticketDoc);

    if (ticket.price !== Number(total_amount)) {
      throw new Error(`El monto enviado (${total_amount}) no coincide con el precio del ticket (${ticket.price}).`);
    }

    ticket.assignToCustomer(id_customer, null); 

    const newPayment = await this.paymentRepo.create({ 
      total_amount, 
      method, 
      operation_code 
    });
    ticket.id_payment = newPayment._id.toString();

    await this.ticketRepo.update(ticket);

    await this.historyRepo.create({
      id_ticket,
      id_customer,
      action_type: 'PURCHASE_COMPLETE',
      details: `Pago procesado con método: ${method}. Código op: ${operation_code}`
    });

    return { 
      message: 'Compra realizada con éxito', 
      id_payment: newPayment._id 
    };
  }
}

module.exports = PurchaseTicket;