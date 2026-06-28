class MongoVenueRepository {
  constructor(VenueModel) {
    this.model = VenueModel
  }

  async findAll() {
    return await this.model.find()
  }
}

module.exports = MongoVenueRepository
