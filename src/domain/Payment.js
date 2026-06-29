const VALID_METHODS = ['tarjeta', 'efectivo', 'transferencia']

class Payment {
  constructor({ id, total_amount, payment_date, method, operation_code }) {
    this.id = id
    this.total_amount = total_amount
    this.payment_date = payment_date
    this.method = method
    this.operation_code = operation_code
    this.validate()
  }

  validate() {
    if (this.total_amount === undefined || this.total_amount === null || this.total_amount <= 0) {
      throw new Error('El monto del pago debe ser mayor a 0')
    }
    if (!this.method || !VALID_METHODS.includes(this.method)) {
      throw new Error(`El método de pago debe ser uno de: ${VALID_METHODS.join(', ')}`)
    }
    if (!this.operation_code || this.operation_code.trim().length === 0) {
      throw new Error('El código de operación es requerido')
    }
  }
}

module.exports = Payment
