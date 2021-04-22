import { List } from '@material-ui/core'
import React from 'react'
import { longMsg } from 'storybookData'

import Conversation from './Conversation'

export default {
  title: 'Messages/Sidebar/Conversation',
  component: Conversation,
  argTypes: { unread: { control: { type: 'number', min: 0, max: 100 } } },
  parameters: { backgrounds: { default: 'light' } },
}

const Template = (args) => (
  <List>
    <Conversation {...args} />
  </List>
)
Template.args = {
  user: { name: 'santiago', img: 'https://i.pravatar.cc' },
  unread: 0,
  lastMessage: 'Last message',
  online: false,
}
export { Template as Conversation }

export const Online = Template.bind({})
Online.args = { ...Template.args, online: true }

export const Emoji = Template.bind({})
Emoji.args = { ...Template.args, lastMessage: '😅😅😅' }

export const OneUnread = Template.bind({})
OneUnread.args = { ...Template.args, unread: 1 }

export const SomeUnread = Template.bind({})
SomeUnread.args = { ...Template.args, unread: 12 }

export const ManyUnread = Template.bind({})
ManyUnread.args = { ...Template.args, unread: 100 }

export const LongLastMessage = Template.bind({})
LongLastMessage.args = { ...Template.args, lastMessage: longMsg }
