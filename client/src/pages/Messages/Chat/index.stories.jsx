import React, { useState, useEffect } from 'react'
import Chat from '.'
import SocketMock from 'socket.io-mock'

import { SocketContext } from 'context/SocketContext'
import { UserContext } from 'context/UserContext'
import { CacheProvider } from 'context/Cache'
import { resolveUsers, messages, me } from 'storybookData'
import { other } from 'storybookData'

export default {
  title: 'Messages/Chat/Chat',
  component: Chat,
  argTypes: { onSendMessage: { action: 'sendMessage' } },
}

const Template = ({ onSendMessage, messages, ...props }) => {
  const [socket] = useState(() => new SocketMock())
  useEffect(() => {
    const send = ['send_message', onSendMessage]
    socket.on(...send)
    return () => {
      socket.off(...send)
    }
  }, [socket, onSendMessage])

  useEffect(() => {
    messages.forEach((msg) => socket.emit('new_message', msg))
  }, [messages, socket])

  return (
    <SocketContext.Provider value={socket.socketClient}>
      <UserContext.Provider value={me}>
        <CacheProvider resolve={resolveUsers}>
          <Chat {...props} />
        </CacheProvider>
      </UserContext.Provider>
    </SocketContext.Provider>
  )
}

Template.args = { messages, conversation: other._id }
export { Template as Chat }
