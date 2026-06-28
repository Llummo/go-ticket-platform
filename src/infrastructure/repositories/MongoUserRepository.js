class MongoUserRepository {
  constructor(UserModel) {
    this.model = UserModel
  }

  async findByEmail(email) {
    return this.model.findOne({ email })
  }

  async create(userData) {
    return this.model.create(userData)
  }
}

module.exports = MongoUserRepository