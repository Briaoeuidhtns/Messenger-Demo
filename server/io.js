const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const { jwtCookieParser, requireUser } = require('./middleware/auth')
const { User, registerOnlineGetter } = require('./schema/User')
const { Message } = require('./schema/Message')
const util = require('util')
const { Conversation } = require('./schema/Conversation')
const io = new Server(undefined, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

const online = new Map()
io.online = online
registerOnlineGetter((id) => !!online.get(id.toString()))

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
    await Conversation.findById(to)
    const msg = await (await Message.create({ content, to, from: user._id }))
      .populate('to')
      .execPopulate()

    const msgObject = msg.toObject({ depopulate: true })
    msg.to.members.forEach((u) => socket.to(u).emit('new_message', msgObject))
  })

  /**
   * Get all conversations this user is in
   */
  socket.on(
    'get_conversations',
    util.callbackify(
      async () => await Conversation.find().where('members').in([user._id])
    )
  )

  /**
   * Get a conversation by the conversation id
   */
  socket.on(
    'get_conversation_by_id',
    util.callbackify(async (conversationId) =>
      (
        await Message.find({ to: conversationId })
          .sort('createdAt')
          .populate({ path: 'members', match: { _id: { $ne: user._id } } })
      ).toObject({ virtual: true })
    )
  )

  /**
   * Get a conversation by the user(s) involved
   *
   * The authorized user is implicitly included in the query.
   *
   * The query will only match conversations exactly matching the user list.
   *
   * If the conversation doesn't exist, it will be created
   */
  socket.on(
    'get_conversation_by_users',
    util.callbackify(async (users) =>
      (
        await Conversation.findOrCreate({
          members: [...users, user._id.toString()],
        }).populate({ path: 'members', match: { _id: { $ne: user._id } } })
      ).toObject({ virtuals: true })
    )
  )

  /**
   * Find another user by fuzzy text search
   */
  socket.on(
    'find_user',
    util.callbackify(async (query) =>
      query == null
        ? []
        : await User.find(
            { $text: { $search: query }, _id: { $ne: user._id } },
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
