import React, { useEffect, useState } from 'react'

import { SocketContext } from 'context/SocketContext'
import { UserContext } from 'context/UserContext'
import { messages, me, createSocketMock } from 'storybookData'
import SWRSocketConfig from 'SWRSocketConfig'

import Messages from '.'

export default {
  title: 'Messages',
  component: Messages,
  parameters: { layout: 'fullscreen' },
}

const Template = ({ messages }) => {
  const [socket] = useState(createSocketMock)

  useEffect(() => {
    messages.forEach((msg) => socket.emit('new_message', msg))
  }, [messages, socket])

  return (
    <SocketContext.Provider value={socket.socketClient}>
      <UserContext.Provider value={{ user: me }}>
        <SWRSocketConfig>
          <Messages />
        </SWRSocketConfig>
      </UserContext.Provider>
    </SocketContext.Provider>
  )
}
Template.args = {
  messages,
}

export { Template as Messages }
