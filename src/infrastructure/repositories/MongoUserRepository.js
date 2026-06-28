class MongoUserRepository {
  constructor(UserModel) {
    this.model = UserModel
  }

  async findByEmailAndRole(email, role) {
    return await this.model.findOne({ email, role })
  }
}

module.exports = MongoUserRepository
