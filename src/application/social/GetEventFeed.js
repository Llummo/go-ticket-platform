class GetEventFeed {
  constructor(postRepo) {
    this.postRepo = postRepo
  }

  async execute(eventId) {
    if (!eventId) throw new Error('El ID del evento es requerido')
    
    return this.postRepo.findByEvent(eventId)
  }
}

module.exports = GetEventFeed