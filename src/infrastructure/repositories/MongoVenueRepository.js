class MongoVenueRepository {
  constructor(VenueModel) {
    this.model = VenueModel
  }

  async findAll() {
    return this.model.find()
  }
}

module.exports = MongoVenueRepository
