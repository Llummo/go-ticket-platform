# GoTicket Platform

A Node.js + Express + MongoDB ticket sales platform built with a lightweight DDD (Domain-Driven Design) architecture.

---

## Architecture

The project is organized into 4 layers. Dependencies only point inward — interfaces know about application, application knows about domain, domain knows about nothing.

```
src/
├── domain/            # Plain JS classes, zero dependencies
├── application/       # Use cases, one class per operation
├── infrastructure/    # Mongoose models, repositories, DB connection
└── interfaces/
    └── http/          # Express routers + server setup
index.js               # Wires all layers together
```

### Domain
Pure business entities with no framework dependencies. Constructors enforce business rules and throw errors if invariants are violated.

- `User` — platform user (customer, organizer, admin)
- `Venue` — physical location for events
- `Category` — event category
- `Event` — event with title, date, venue, category and organizer
- `Ticket` — seat with row, seat number, price and status (`AVAILABLE` / `SOLD`)
- `Payment` — payment record linked to a ticket purchase
- `History` — audit log of ticket actions

### Application
One class per use case. Each class receives its repositories via constructor (dependency injection) and calls no framework code.

| Use Case | Description |
|---|---|
| `Login` | Authenticate user by email and role |
| `GetVenues` | List all venues |
| `GetCategories` | List all categories |
| `GetEvents` | List all events with venue and category details |
| `CreateEventWithTickets` | Create an event and auto-generate 40 seats (rows A–D, seats 1–10) |
| `UpdateEvent` | Update event title, description or date |
| `GetTicketsByEvent` | List all tickets for a given event |
| `GetTicketById` | Get full detail of a single ticket |
| `GetCustomerTickets` | List all purchased tickets for a customer |
| `PurchaseTicket` | Process payment, mark ticket as SOLD, log to history |
| `GetTransactions` | List all transactions (admin) |

### Infrastructure
Mongoose schemas and thin repository classes that wrap them. The application layer only sees the repository interface, never Mongoose directly.

```
infrastructure/
├── db/
│   ├── connection.js        # MongoDB connection
│   └── models/              # 7 Mongoose schemas
└── repositories/            # 7 repository classes (MongoXxxRepository)
```

### Interfaces
Express routers. Each router file exports a factory function that receives the relevant use cases as arguments. No business logic lives here — only HTTP parsing and response formatting.

```
interfaces/http/
├── server.js           # Express app setup, CORS, static files, Swagger mount
├── authRoutes.js
├── catalogRoutes.js
├── eventRoutes.js
├── ticketRoutes.js
├── purchaseRoutes.js
└── adminRoutes.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| GET | `/api/venues` | List venues |
| GET | `/api/categories` | List categories |
| GET | `/api/events` | List events |
| POST | `/api/admin/events-with-tickets` | Create event + auto-generate tickets |
| PUT | `/api/events/:id` | Update event |
| GET | `/api/events/:id/tickets` | Tickets for an event |
| GET | `/api/tickets/:id` | Single ticket detail |
| POST | `/api/purchase` | Purchase a ticket |
| GET | `/api/admin/transactions` | All transactions |
| GET | `/api/customer/:id/tickets` | Customer's purchased tickets |

Interactive docs available at `/api-docs` (Swagger UI).

---

## Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| HTTP | Express |
| Database | MongoDB + Mongoose |
| Docs | Swagger UI Express |

---

## Running locally

1. Install [MongoDB Community](https://www.mongodb.com/try/download/community) and start the service
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Server runs on `http://localhost:3000`
5. Swagger UI at `http://localhost:3000/api-docs`
