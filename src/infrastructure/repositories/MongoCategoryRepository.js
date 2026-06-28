class MongoCategoryRepository {
  constructor(CategoryModel) {
    this.model = CategoryModel
  }

  async findAll() {
    return await this.model.find()
  }
}

module.exports = MongoCategoryRepository
