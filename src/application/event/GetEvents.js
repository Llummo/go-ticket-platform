class GetEvents {
  constructor(eventRepo) {
    this.eventRepo = eventRepo
  }

  async execute() {
    const events = await this.eventRepo.findAllWithDetails()
    return events.map(e => ({
      id_event: e._id,
      event_title: e.event_title,
      description: e.description,
      image_url: e.image_url,
      start_date: e.start_date,
      venue_name: e.id_venue ? e.id_venue.name : 'N/A',
      category_name: e.id_category ? e.id_category.name : 'N/A',
      organizer_name: e.id_organizer ? e.id_organizer.name : 'N/A'
    }))
  }
}

module.exports = GetEvents
