const Ticket = require('../../domain/Ticket');

class CreateTicket {
  constructor(ticketRepo, eventRepo) {
    this.ticketRepo = ticketRepo;
    this.eventRepo = eventRepo; 
  }

  async execute(ticketData) {

    const eventExists = await this.eventRepo.model.findById(ticketData.id_event);
    if (!eventExists) {
      throw new Error("No se puede crear el ticket: El evento asignado no existe.");
    }

    const seatOccupied = await this.ticketRepo.findOneBySeat(
      ticketData.id_event, 
      ticketData.row_str, 
      ticketData.seat_number
    );
    if (seatOccupied) {
      throw new Error("El asiento seleccionado ya está asignado a otro ticket de este evento.");
    }

    const ticketDomain = new Ticket({
      id_event: ticketData.id_event,
      row_str: ticketData.row_str,
      seat_number: ticketData.seat_number,
      price: ticketData.price,
      status: Ticket.AVAILABLE
    });

    return await this.ticketRepo.save(ticketDomain);
  }
}

module.exports = CreateTicket;