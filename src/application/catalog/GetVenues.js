class GetVenues {
  constructor(venueRepo) {
    this.venueRepo = venueRepo
  }

  async execute() {
    return this.venueRepo.findAll()
  }
}

module.exports = GetVenues
