const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'GoTicket API',
    version: '1.0.0',
    description: 'API for the GoTicket platform'
  },
  paths: {
    '/api/auth/login': {
      post: {
        summary: 'Login user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                  role: { type: 'string', example: 'customer' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'User not found' }
        }
      }
    },
    '/api/venues': {
      get: {
        summary: 'List all venues',
        tags: ['Catalog'],
        responses: { 200: { description: 'List of venues' } }
      }
    },
    '/api/categories': {
      get: {
        summary: 'List all categories',
        tags: ['Catalog'],
        responses: { 200: { description: 'List of categories' } }
      }
    },
    '/api/events': {
      get: {
        summary: 'List all events',
        tags: ['Events'],
        responses: { 200: { description: 'List of events' } }
      }
    },
    '/api/admin/events-with-tickets': {
      post: {
        summary: 'Create event and auto-generate tickets',
        tags: ['Events'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_venue: { type: 'string', example: '64a1f...' },
                  id_organizer: { type: 'string', example: '64a1f...' },
                  id_category: { type: 'string', example: '64a1f...' },
                  event_title: { type: 'string', example: 'Rock Concert' },
                  description: { type: 'string', example: 'A great concert' },
                  image_url: { type: 'string', example: 'https://...' },
                  start_date: { type: 'string', format: 'date-time', example: '2026-08-01T20:00:00Z' },
                  price_base: { type: 'number', example: 150 }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Event created and tickets generated' } }
      }
    },
    '/api/events/{id}': {
      put: {
        summary: 'Update an event',
        tags: ['Events'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  event_title: { type: 'string' },
                  description: { type: 'string' },
                  start_date: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Event updated' },
          404: { description: 'Event not found' }
        }
      }
    },
    '/api/events/{id}/tickets': {
      get: {
        summary: 'Get tickets for an event',
        tags: ['Tickets'],
        parameters: [{ name: 'id', in: 'path', required: true, description: 'ID del evento (24 caracteres hex)', schema: { type: 'string' } }],
        responses: { 
          200: { description: 'List of tickets for the event' },
          400: { description: 'ID de evento inválido' }
        }
      }
    },
    '/api/tickets/{id}': {
      get: {
        summary: 'Get ticket detail',
        tags: ['Tickets'],
        parameters: [{ name: 'id', in: 'path', required: true, description: 'ID del ticket (24 caracteres hex)', schema: { type: 'string' } }],
        responses: {
          200: { description: 'Ticket detail rehidratado y formateado' },
          400: { description: 'ID de ticket inválido' },
          404: { description: 'Ticket no encontrado' }
        }
      }
    },
    '/api/customer/{id}/tickets': {
      get: {
        summary: "Get customer's purchased tickets",
        tags: ['Tickets'],
        parameters: [{ name: 'id', in: 'path', required: true, description: 'ID del cliente (24 caracteres hex)', schema: { type: 'string' } }],
        responses: { 
          200: { description: "Customer's ticket list" },
          400: { description: 'ID de cliente inválido' }
        }
      },
      delete: {
        summary: 'Remove a ticket from the catalog',
        tags: ['Tickets'],
        parameters: [{ name: 'id', in: 'path', required: true, description: 'ID del ticket a eliminar', schema: { type: 'string' } }],
        responses: {
          200: { description: 'Ticket eliminado con éxito' },
          400: { description: 'ID de ticket inválido' },
          404: { description: 'El ticket no existe' },
          422: { description: 'Regla de negocio rota (El ticket ya está vendido y no se puede borrar)' }
        }
      }
    },
    '/api/tickets': {
      post: {
        summary: 'Create a new ticket manually',
        tags: ['Tickets'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_event: { type: 'string', example: '64a1ff93b425ca2a38af1b8a' },
                  row_str: { type: 'string', example: 'A' },
                  seat_number: { type: 'number', example: 12 },
                  price: { type: 'number', example: 75.50 }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Ticket creado de manera exitosa' },
          400: { description: 'Faltan campos obligatorios o formato inválido' },
          422: { description: 'Error de negocio (Monto negativo o asiento duplicado)' }
        }
      }
    },
    '/api/purchase': {
      post: {
        summary: 'Purchase a ticket',
        tags: ['Purchase'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id_customer: { type: 'string', example: '64a1ff93b425ca2a38af1b8a' },
                  id_ticket: { type: 'string', example: '64a1ff93b425ca2a38af1b8b' },
                  total_amount: { type: 'number', example: 150 },
                  method: { type: 'string', example: 'credit_card' },
                  operation_code: { type: 'string', example: 'OP-12345' }
                }
              }
            }
          }
        },
        responses: { 
          201: { description: 'Purchase successful' },
          400: { description: 'Faltan parámetros obligatorios' },
          422: { description: 'Error de validación (Monto incorrecto o ticket vendido)' }
        }
      }
    },
    '/api/admin/transactions': {
      get: {
        summary: 'List all transactions (admin)',
        tags: ['Admin'],
        responses: { 200: { description: 'List of transactions' } }
      }
    }
  }
}

module.exports = swaggerSpec;