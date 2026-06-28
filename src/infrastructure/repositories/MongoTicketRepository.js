class MongoTicketRepository {
  constructor(TicketModel) {
    this.model = TicketModel
  }

  async findByEvent(eventId) {
    return this.model.find({ id_event: eventId })
  }

  async findByIdWithDetails(ticketId) {
    return this.model.findById(ticketId)
      .populate({ path: 'id_event', populate: { path: 'id_venue' } })
      .populate('id_customer')
  }

  async insertMany(tickets) {
    return this.model.insertMany(tickets)
  }

  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data)
  }

  async findByCustomer(customerId) {
    return this.model.find({ id_customer: customerId, status: 'SOLD' })
      .populate({ path: 'id_event', populate: { path: 'id_venue' } })
      .sort({ _id: -1 })
  }
}

module.exports = MongoTicketRepository
