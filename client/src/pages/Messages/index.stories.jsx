import React, { useEffect, useState } from 'react'
import SocketMock from 'socket.io-mock'

import { SocketContext } from 'context/SocketContext'
import { UserContext } from 'context/UserContext'
import { resolveUsers, messages, me } from 'storybookData'
import { CacheProvider } from 'context/Cache'

import Messages from '.'
import { searchConversations } from 'storybookData'

export default {
  title: 'Messages',
  component: Messages,
  parameters: { layout: 'fullscreen' },
}

const Template = ({ messages }) => {
  const [socket] = useState(() =>
    // Normally socket.io queues emits until there's a connection, but the mock
    // is always connected, so there's a race condition between registering this
    // handler and calling search in the component.

    // Instead of changing the code to work with a mock with incorrect behavior,
    // register here to ensure it happens first.
    new SocketMock().on('get_conversations', (query, cb) => {
      cb(searchConversations(query))
    })
  )

  useEffect(() => {
    messages.forEach((msg) => socket.emit('new_message', msg))
  }, [messages, socket])

  return (
    <SocketContext.Provider value={socket.socketClient}>
      <UserContext.Provider value={me}>
        <CacheProvider resolve={resolveUsers}>
          <Messages />
        </CacheProvider>
      </UserContext.Provider>
    </SocketContext.Provider>
  )
}
Template.args = {
  messages,
}

export { Template as Messages }
