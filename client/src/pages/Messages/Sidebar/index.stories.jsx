import { SocketContext } from 'context/SocketContext'
import { UserContext } from 'context/UserContext'
import React, { useState } from 'react'
import { createSocketMock, me } from 'storybookData'
import SWRSocketConfig from 'SWRSocketConfig'

import Sidebar from '.'

export default {
  title: 'Messages/Sidebar',
  component: Sidebar,
  argTypes: {
    onSelect: { action: 'select' },
  },
  parameters: { backgrounds: { default: 'dark' } },
}

const Template = ({ user }) => {
  const [socket] = useState(createSocketMock)
  const [active, setActive] = useState()

  return (
    <SocketContext.Provider value={socket.socketClient}>
      <UserContext.Provider value={{ user }}>
        <SWRSocketConfig>
          <Sidebar {...{ active, setActive }} />
        </SWRSocketConfig>
      </UserContext.Provider>
    </SocketContext.Provider>
  )
}
Template.args = {
  user: me,
}

export { Template as Sidebar }
