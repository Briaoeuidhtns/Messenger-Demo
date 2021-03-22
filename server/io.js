const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const { jwtCookieParser, requireUser } = require('./middleware/auth')
const { User } = require('./schema/User')
const { Message } = require('./schema/Message')
const { ObjectId } = require('mongoose').Types
const util = require('util')
const io = new Server(undefined, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const online = new Map()
io.online = online

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

  socket.on('send_message', async ({ content, to }) => {
    const msg = await Message.create({ content, to, from: user._id })
    console.log(msg)
    socket.to(to).emit('new_message', msg)
  })

  socket.on(
    'get_conversations',
    util.callbackify(async () =>
      (
        await Message.aggregate([
          { $match: { $or: [{ to: user._id }, { from: user._id }] } },
          { $project: { incl: ['$from', '$to'] } },
          { $unwind: '$incl' },
          { $group: { _id: '$incl' } },
        ])
      ).map((x) => x._id)
    )
  )

  socket.on(
    'get_conversation',
    util.callbackify(async (rawId) => {
      const id = ObjectId(rawId)
      return await Message.find({ to: id }).sort({ createdAt: 'ascending' })
    })
  )

  socket.on(
    'find_user',
    util.callbackify(async (query) =>
      query == null
        ? []
        : await User.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
          )
            .sort({ score: { $meta: 'textScore' } })
            .limit(10)
    )
  )

  socket.on('disconnect', () => {
    update(online, user._id.toString(), (x) => x - 1)
  })
})

module.exports = io
