class MongoCategoryRepository {
  constructor(CategoryModel) {
    this.model = CategoryModel
  }

  async findAll() {
    return this.model.find()
  }
}

module.exports = MongoCategoryRepository
