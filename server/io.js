const asyncHandler = require('./routes/asyncHandler')
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const { jwtCookieParser, requireUser } = require('./middleware/auth')
const { User } = require('./schema/User')
const io = new Server(undefined, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const online = new Map()

const JWT_COOKIE_NAME = 'SESSION_TOKEN'

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, { locals: {} }, next)

io.use(wrap(cookieParser()))

io.use(
  wrap(
    jwtCookieParser({
      cookie: JWT_COOKIE_NAME,
      key: process.env.JWT_PRIVATE_KEY,
      jwtOpts: { algorithms: [process.env.JWT_ALG] },
      convert: User.fromClaim.bind(User),
    })
  )
)

io.use(wrap(requireUser))

const update = (m, k, f) => {
  m.set(k, f(m.get(k)))
}

io.on('connection', (socket) => {
  const user = socket.request.user.data
  socket.join(user._id.toString())
  update(online, user._id.toString(), (x = 0) => x + 1)
  socket.on('send_message', ({ content, to }) => {
    console.log(`${user._id} -> ${to}: ${content}`)
    socket.to(to).emit('new_message', { from: user._id, content })
  })
  socket.on('disconnect', () => {
    update(online, user._id.toString(), (x) => x - 1)
  })
})

module.exports = io
