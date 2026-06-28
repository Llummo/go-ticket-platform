class MongoPaymentRepository {
  constructor(PaymentModel) {
    this.model = PaymentModel
  }

  async create(data) {
    return this.model.create(data)
  }
}

module.exports = MongoPaymentRepository
