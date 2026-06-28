class Event {
  constructor({ id, event_title, description, image_url, start_date, id_venue, id_category, id_organizer }) {
    if (!event_title) throw new Error('El título del evento es requerido')
    if (!start_date) throw new Error('La fecha de inicio es requerida')
    if (!id_venue) throw new Error('El venue es requerido')
    if (!id_category) throw new Error('La categoría es requerida')
    if (!id_organizer) throw new Error('El organizador es requerido')

    this.id = id
    this.event_title = event_title
    this.description = description
    this.image_url = image_url
    const parsedDate = new Date(start_date)
    if (isNaN(parsedDate.getTime())) throw new Error('La fecha de inicio no es válida')
    if (parsedDate <= new Date()) throw new Error('La fecha de inicio debe ser una fecha futura')
    this.start_date = parsedDate
    this.id_venue = id_venue
    this.id_category = id_category
    this.id_organizer = id_organizer
  }
}

module.exports = Event
