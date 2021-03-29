import SocketMock from 'socket.io-mock'
import { callbackify } from 'util'

export const randomObjectId = (size = 16) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const users = [
  'thomas',
  'santiago',
  'chiumbo',
  'hualing',
  'ashanti',
  'julia',
  'cheng',
].map((name) => ({
  _id: randomObjectId(),
  name,
  img: `https://i.pravatar.cc/?u=${name}`,
}))

export const [me, other] = users

export const resolveUsers = async (k) => {
  // to show loading state
  await sleep(1000)
  return users.find(({ _id }) => k === _id)
}

export const longMsg =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in voluptate sit, qui epuletur, in dolore, qui torqueatur. Cuius similitudine perspecta in formarum specie ac dignitate transitum est ad honestatem dictorum atque factorum. Atque haec coniunctio confusioque virtutum tamen a philosophis ratione quadam distinguitur. Ait enim se, si uratur, Quam hoc suave! dicturum. Duo Reges: constructio interrete. Hoc mihi cum tuo fratre convenit. Inscite autem medicinae et gubernationis ultimum cum ultimo sapientiae comparatur. Aliter enim explicari, quod quaeritur, non potest.'

export const messages = [
  ['Where are you from?', other._id, [10, 45]],
  ["I'm from New York", me._id, [10, 51]],
  ['Share photo of your city, please', other._id, [10, 55]],
  [longMsg, me._id, [10, 58]],
].map(([content, from, [h, m]]) => {
  const createdAt = new Date()
  createdAt.setHours(h)
  createdAt.setMinutes(m)
  return {
    content,
    from,
    createdAt,
  }
})

export const conversations = [
  ['santiago', 'Share photo of your city, please', true],
  ['chiumbo', 'Sure! what time?', true, 1],
  ['hualing', '😅😅😅', false, 12],
  ['ashanti', 'Sent photo', false],
  ['julia', 'Do you have any plans?', false],
  ['cheng', 'Message', false],
].map(([nameq, lastMessage, online, unread = 0]) => ({
  _id: randomObjectId(),
  members: [users.find(({ name }) => name === nameq)],
  online,
  lastMessage,
  unread,
}))

export const searchConversations = (query) => {
  if (query) {
    const ids = new Set(
      users.filter(({ name }) => name.includes(query)).map(({ _id }) => _id)
    )
    return conversations.filter(({ user }) => ids.has(user))
  }
  return conversations
}

export const createSocketMock = () =>
  // Normally socket.io queues emits until there's a connection, but the mock
  // is always connected, so there's a race condition between registering this
  // handler and calling search in the component.

  // Instead of changing the code to work with a mock with incorrect behavior,
  // register when creating to ensure it happens first.
  new SocketMock()
    .on(
      'get_conversations',
      callbackify(async () => conversations)
    )
    .on(
      'get_conversation_messages',
      callbackify(async (id) => {
        return messages
      })
    )
