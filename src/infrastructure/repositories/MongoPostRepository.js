class MongoPostRepository {
  constructor(PostModel) {
    this.model = PostModel
  }

  async create(data) {
    return this.model.create(data)
  }

  async findByEvent(eventId) {
    return this.model.find({ id_event: eventId })
      .populate('id_user', 'name avatar')
      .sort({ created_at: -1 })
  }

  async findByUser(userId) {
    return this.model.find({ id_user: userId })
      .populate('id_event', 'event_title image_url')
      .sort({ created_at: -1 })
  }
}

module.exports = MongoPostRepository