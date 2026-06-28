class History {
  constructor({ id, id_ticket, id_customer, action_type, action_date, details }) {
    this.id = id
    this.id_ticket = id_ticket
    this.id_customer = id_customer
    this.action_type = action_type
    this.action_date = action_date
    this.details = details
  }
}

module.exports = History
