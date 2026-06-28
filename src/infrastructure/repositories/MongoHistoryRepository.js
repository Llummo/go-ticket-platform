class MongoHistoryRepository {
  constructor(HistoryModel) {
    this.model = HistoryModel
  }

  async create(data) {
    return await this.model.create(data)
  }

  async findAllWithDetails() {
    return await this.model.find()
      .populate({ path: 'id_ticket', populate: { path: 'id_event id_payment' } })
      .populate('id_customer')
      .sort({ action_date: -1 })
  }
}

module.exports = MongoHistoryRepository
