class UpdateEvent {
  constructor(eventRepo) {
    this.eventRepo = eventRepo
  }

  async execute(id, { event_title, description, start_date }) {
    const updated = await this.eventRepo.updateById(id, { event_title, description, start_date })
    if (!updated) return null
    return { message: 'Evento actualizado correctamente' }
  }
}

module.exports = UpdateEvent
