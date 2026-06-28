class DeleteTicket {
  constructor(ticketRepo) {
    this.ticketRepo = ticketRepo;
  }

  async execute(ticketId) {
    const ticketDoc = await this.ticketRepo.model.findById(ticketId);
    if (!ticketDoc) {
      throw new Error("El ticket que intenta eliminar no existe.");
    }

    const ticket = this.ticketRepo._toDomain(ticketDoc);

    ticket.canBeDeleted();

    await this.ticketRepo.model.findByIdAndDelete(ticketId);

    return { message: "Ticket eliminado exitosamente de la plataforma" };
  }
}

module.exports = DeleteTicket;