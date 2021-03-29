import React, { useState, useEffect } from 'react'
import Chat from '.'

import { SocketContext } from 'context/SocketContext'
import SWRSocketConfig from 'SWRSocketConfig'
import { UserContext } from 'context/UserContext'
import { messages, me, createSocketMock, conversations } from 'storybookData'

export default {
  title: 'Messages/Chat/Chat',
  component: Chat,
  argTypes: { onSendMessage: { action: 'sendMessage' } },
}

const Template = ({ onSendMessage, messages, ...props }) => {
  const [socket] = useState(createSocketMock)
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
      <UserContext.Provider value={{ user: me }}>
        <SWRSocketConfig>
          <Chat {...props} />
        </SWRSocketConfig>
      </UserContext.Provider>
    </SocketContext.Provider>
  )
}

Template.args = { messages, conversation: conversations[0] }
export { Template as Chat }
