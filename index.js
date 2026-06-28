global.crypto = require('crypto')

const { connect } = require('./src/infrastructure/db/connection')

// Models
const UserModel = require('./src/infrastructure/db/models/UserModel')
const VenueModel = require('./src/infrastructure/db/models/VenueModel')
const CategoryModel = require('./src/infrastructure/db/models/CategoryModel')
const EventModel = require('./src/infrastructure/db/models/EventModel')
const PaymentModel = require('./src/infrastructure/db/models/PaymentModel')
const TicketModel = require('./src/infrastructure/db/models/TicketModel')
const HistoryModel = require('./src/infrastructure/db/models/HistoryModel')
const PostModel = require('./src/infrastructure/db/models/PostModel')

// Repositories
const MongoUserRepository = require('./src/infrastructure/repositories/MongoUserRepository')
const MongoVenueRepository = require('./src/infrastructure/repositories/MongoVenueRepository')
const MongoCategoryRepository = require('./src/infrastructure/repositories/MongoCategoryRepository')
const MongoEventRepository = require('./src/infrastructure/repositories/MongoEventRepository')
const MongoPaymentRepository = require('./src/infrastructure/repositories/MongoPaymentRepository')
const MongoTicketRepository = require('./src/infrastructure/repositories/MongoTicketRepository')
const MongoHistoryRepository = require('./src/infrastructure/repositories/MongoHistoryRepository')
const MongoPostRepository = require('./src/infrastructure/repositories/MongoPostRepository')


// Use Cases
const Login = require('./src/application/auth/Login')
const Register = require('./src/application/auth/Register')
const GetVenues = require('./src/application/catalog/GetVenues')
const GetCategories = require('./src/application/catalog/GetCategories')
const GetEvents = require('./src/application/event/GetEvents')
const CreateEventWithTickets = require('./src/application/event/CreateEventWithTickets')
const UpdateEvent = require('./src/application/event/UpdateEvent')
const GetTicketsByEvent = require('./src/application/ticket/GetTicketsByEvent')
const GetTicketById = require('./src/application/ticket/GetTicketById')
const GetCustomerTickets = require('./src/application/ticket/GetCustomerTickets')
const PurchaseTicket = require('./src/application/purchase/PurchaseTicket')
const GetTransactions = require('./src/application/admin/GetTransactions')

const CreateTicket = require('./src/application/ticket/CreateTicket')
const DeleteTicket = require('./src/application/ticket/DeleteTicket')

const CreatePost = require('./src/application/social/CreatePost')
const GetEventFeed = require('./src/application/social/GetEventFeed')
const GetUserProfile = require('./src/application/social/GetUserProfile')

// Routes
const authRoutes = require('./src/interfaces/http/authRoutes')
const catalogRoutes = require('./src/interfaces/http/catalogRoutes')
const eventRoutes = require('./src/interfaces/http/eventRoutes')
const ticketRoutes = require('./src/interfaces/http/ticketRoutes')
const purchaseRoutes = require('./src/interfaces/http/purchaseRoutes')
const adminRoutes = require('./src/interfaces/http/adminRoutes')
const socialRoutes = require('./src/interfaces/http/socialRoutes')

const { createServer } = require('./src/interfaces/http/server')

const main = async () => {
  await connect()

  const bcrypt = require('bcrypt');
  const adminEmail = 'admin@test.com';
  const existingAdmin = await UserModel.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234', salt);
    await UserModel.create({
      email: adminEmail,
      name: 'Super Admin',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Default admin account created.');
  }

  // Repos
  const userRepo = new MongoUserRepository(UserModel)
  const venueRepo = new MongoVenueRepository(VenueModel)
  const categoryRepo = new MongoCategoryRepository(CategoryModel)
  const eventRepo = new MongoEventRepository(EventModel)
  const paymentRepo = new MongoPaymentRepository(PaymentModel)
  const ticketRepo = new MongoTicketRepository(TicketModel)
  const historyRepo = new MongoHistoryRepository(HistoryModel)
  const postRepo = new MongoPostRepository(PostModel)

  // Use cases
  const loginUseCase = new Login(userRepo)
  const registerUseCase = new Register(userRepo)
  const getVenuesUseCase = new GetVenues(venueRepo)
  const getCategoriesUseCase = new GetCategories(categoryRepo)
  const getEventsUseCase = new GetEvents(eventRepo)
  const createEventWithTicketsUseCase = new CreateEventWithTickets(eventRepo, ticketRepo)
  const updateEventUseCase = new UpdateEvent(eventRepo)
  const getTicketsByEventUseCase = new GetTicketsByEvent(ticketRepo)
  const getTicketByIdUseCase = new GetTicketById(ticketRepo)
  const getCustomerTicketsUseCase = new GetCustomerTickets(ticketRepo)
  const purchaseTicketUseCase = new PurchaseTicket(paymentRepo, ticketRepo, historyRepo)
  const getTransactionsUseCase = new GetTransactions(historyRepo)

  const createTicketUseCase = new CreateTicket(ticketRepo, eventRepo) // <-- AGREGAR (necesita eventRepo para validar que el evento exista)
  const deleteTicketUseCase = new DeleteTicket(ticketRepo)

  const createPostUseCase = new CreatePost(postRepo)
  const getEventFeedUseCase = new GetEventFeed(postRepo)
  const getUserProfileUseCase = new GetUserProfile(userRepo, postRepo)

  // Routers
  const routers = [
    authRoutes(loginUseCase, registerUseCase),
    catalogRoutes(getVenuesUseCase, getCategoriesUseCase),
    eventRoutes(getEventsUseCase, createEventWithTicketsUseCase, updateEventUseCase),
    ticketRoutes(getTicketsByEventUseCase, getTicketByIdUseCase, getCustomerTicketsUseCase, createTicketUseCase, deleteTicketUseCase),
    purchaseRoutes(purchaseTicketUseCase),
    adminRoutes(getTransactionsUseCase),
    socialRoutes(createPostUseCase, getEventFeedUseCase, getUserProfileUseCase)
  ]

  const app = createServer(routers)
  app.listen(3000, () => console.log('GoTicket server running on port: 3000 (MongoDB Edition)'))
}

main().catch(console.error)
