import React from 'react'

import { List } from '@material-ui/core'
import Bubble from './Bubble'
import { longMsg } from 'storybookData'

export default {
  title: 'Messages/Chat/Bubble',
  component: Bubble,
  argTypes: {
    sendTime: { control: { type: 'date' } },
  },
}

const Template = (args) => (
  <List>
    <Bubble {...args} />
  </List>
)
Template.args = {
  value: 'Message text',
  sendTime: new Date(),
}

export const Received = Template.bind({})
Received.args = {
  ...Template.args,
  sender: { name: 'santiago', img: 'https://i.pravatar.cc' },
}

export const Sent = Template.bind({})
Sent.args = { ...Template.args, isSender: undefined }

export const LongReceived = Template.bind({})
LongReceived.args = {
  ...Received.args,
  value: longMsg,
}

export const LongSent = Template.bind({})
LongSent.args = {
  ...Sent.args,
  value: longMsg,
}
