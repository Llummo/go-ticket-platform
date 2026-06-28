class MongoEventRepository {
  constructor(EventModel) {
    this.model = EventModel
  }

  async findAllWithDetails() {
    return await this.model.find()
      .populate('id_venue', 'name')
      .populate('id_category', 'name')
      .sort({ start_date: 1 })
  }

  async create(data) {
    return await this.model.create(data)
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true })
  }
}

module.exports = MongoEventRepository
