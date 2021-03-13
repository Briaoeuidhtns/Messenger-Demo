import React, { useMemo, useState } from 'react'
import Sidebar from '.'

import { me, conversations, resolveUsers } from 'storybookData'
import { UserContext } from 'context/UserContext'
import { CacheProvider } from 'context/Cache'

export default {
  title: 'Messages/Sidebar',
  component: Sidebar,
  argTypes: {
    count: { control: { type: 'number', min: 0, max: conversations.length } },
    onSelect: { action: 'select' },
  },
  parameters: { backgrounds: { default: 'dark' } },
}

const Template = ({ count, user, ...props }) => {
  const conversationSlice = useMemo(() => conversations.slice(0, count), [
    count,
  ])
  const [search, setSearch] = useState('')
  return (
    <UserContext.Provider value={user}>
      <CacheProvider resolve={resolveUsers}>
        <Sidebar
          conversations={conversationSlice}
          search={search}
          setSearch={setSearch}
          {...props}
        />
      </CacheProvider>
    </UserContext.Provider>
  )
}
Template.args = {
  count: 2,
  user: me,
}

export { Template as Sidebar }
