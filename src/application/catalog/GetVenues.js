class GetVenues {
  constructor(venueRepo) {
    this.venueRepo = venueRepo
  }

  async execute() {
    return await this.venueRepo.findAll()
  }
}

module.exports = GetVenues
