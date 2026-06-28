const Ticket = require('../../domain/Ticket');

class MongoTicketRepository {
  constructor(TicketModel) {
    this.model = TicketModel;
  }

  // Helper para mapear un documento de Mongoose a la Entidad de Dominio
  _toDomain(mongoDoc) {
    if (!mongoDoc) return null;
    return new Ticket({
      id: mongoDoc._id.toString(),
      id_event: mongoDoc.id_event,
      id_customer: mongoDoc.id_customer,
      id_payment: mongoDoc.id_payment,
      row_str: mongoDoc.row_str,
      seat_number: mongoDoc.seat_number,
      price: mongoDoc.price,
      status: mongoDoc.status
    });
  }

  async findByEvent(eventId) {
    const docs = await this.model.find({ id_event: eventId });
    return docs.map(doc => this._toDomain(doc));
  }

  // Este lo dejamos devolviendo el objeto plano/populado porque tu caso de uso "GetTicketById"
  // ya se encarga de transformarlo a un DTO específico con nombres de cliente, evento, etc.
  async findByIdWithDetails(ticketId) {
    return this.model.findById(ticketId)
      .populate({ path: 'id_event', populate: { path: 'id_venue' } })
      .populate('id_customer');
  }

  // Guardar un solo ticket (esencial para el Create del CRUD)
  async save(ticketDomain) {
    // Extraemos los datos limpios de la entidad de dominio para evitar meter ruido a Mongo
    const mongoData = {
      id_event: ticketDomain.id_event,
      id_customer: ticketDomain.id_customer,
      id_payment: ticketDomain.id_payment,
      row_str: ticketDomain.row_str,
      seat_number: ticketDomain.seat_number,
      price: ticketDomain.price,
      status: ticketDomain.status
    };

    // Mongoose creará el documento y le asignará su propio _id
    const createdDoc = await this.model.create(mongoData);
    
    // Devolvemos mapeado a dominio
    return this._toDomain(createdDoc);
  }

  async insertMany(ticketsDomainArray) {
    // Validar que todos sean instancias correctas antes de insertar en lote
    const mongoDataArray = ticketsDomainArray.map(ticket => {
      // Forzamos a que pase por la validación del dominio por si acaso
      ticket.validate(); 
      return {
        id_event: ticket.id_event,
        row_str: ticket.row_str,
        seat_number: ticket.seat_number,
        price: ticket.price,
        status: ticket.status
      };
    });

    const docs = await this.model.insertMany(mongoDataArray);
    return docs.map(doc => this._toDomain(doc));
  }

  // Modificado para el Update del CRUD: En DDD no solemos mandar "data" aleatoria, 
  // mandamos la entidad mutada y validada por el dominio.
  async update(ticketDomain) {
    const updatedDoc = await this.model.findByIdAndUpdate(
      ticketDomain.id,
      {
        id_customer: ticketDomain.id_customer,
        id_payment: ticketDomain.id_payment,
        status: ticketDomain.status
      },
      { new: true } // Nos devuelve el documento actualizado
    );
    
    return this._toDomain(updatedDoc);
  }

  async findByCustomer(customerId) {
    return this.model.find({ id_customer: customerId, status: Ticket.SOLD })
      .populate({ path: 'id_event', populate: { path: 'id_venue' } })
      .sort({ _id: -1 });
  }

  // Helper extra de aplicación para evitar duplicados de asientos
  async findOneBySeat(eventId, rowStr, seatNumber) {
    // El objeto de consulta debe mapear exactamente las llaves de tu Schema de Mongoose
    const doc = await this.model.findOne({ 
      id_event: eventId, 
      row_str: rowStr, 
      seat_number: seatNumber 
    });
    
    return this._toDomain(doc);
  }
}

module.exports = MongoTicketRepository;