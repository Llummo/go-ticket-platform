class Payment {
  constructor({ id, total_amount, payment_date, method, operation_code }) {
    this.id = id
    this.total_amount = total_amount
    this.payment_date = payment_date
    this.method = method
    this.operation_code = operation_code
  }
}

module.exports = Payment
