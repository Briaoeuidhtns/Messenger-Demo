import { SocketContext } from 'context/SocketContext'
import { UserContext } from 'context/UserContext'
import { useEffect, useState } from 'react'
import { conversations, createSocketMock, me, messages } from 'storybookData'
import SWRSocketConfig from 'SWRSocketConfig'

import Chat from '.'

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
