class PurchaseTicket {
  constructor(paymentRepo, ticketRepo, historyRepo) {
    this.paymentRepo = paymentRepo
    this.ticketRepo = ticketRepo
    this.historyRepo = historyRepo
  }

  async execute({ id_customer, id_ticket, total_amount, method, operation_code }) {
    const newPayment = await this.paymentRepo.create({ total_amount, method, operation_code })

    await this.ticketRepo.updateById(id_ticket, {
      id_payment: newPayment._id,
      id_customer,
      status: 'SOLD'
    })

    await this.historyRepo.create({
      id_ticket,
      id_customer,
      action_type: 'PURCHASE_COMPLETE',
      details: `Pago procesado con método: ${method}. Código op: ${operation_code}`
    })

    return { message: 'Compra realizada con éxito', id_payment: newPayment._id }
  }
}

module.exports = PurchaseTicket
