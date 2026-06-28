class MongoPaymentRepository {
  constructor(PaymentModel) {
    this.model = PaymentModel
  }

  async create(data) {
    return await this.model.create(data)
  }
}

module.exports = MongoPaymentRepository
