class GetCategories {
  constructor(categoryRepo) {
    this.categoryRepo = categoryRepo
  }

  async execute() {
    return this.categoryRepo.findAll()
  }
}

module.exports = GetCategories
