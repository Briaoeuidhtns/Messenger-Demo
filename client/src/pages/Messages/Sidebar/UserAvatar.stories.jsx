import React from 'react'
import UserAvatar from './UserAvatar'
import { me as user } from 'storybookData'

export default {
  title: 'Messages/UserAvatar',
  component: UserAvatar,
}

const Template = (props) => <UserAvatar {...props} />
Template.args = { user }

export const Online = Template.bind({})
Online.args = { ...Template.args, online: true }

export const Offline = Template.bind({})
Offline.args = { ...Template.args, online: false }
