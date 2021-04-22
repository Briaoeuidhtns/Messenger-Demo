import { me as user } from 'storybookData'

import UserAvatar from './UserAvatar'

export default {
  title: 'Messages/UserAvatar',
  component: UserAvatar,
}

const Template = (props) => <UserAvatar {...props} />
Template.args = { user }

export const Online = Template.bind({})
Online.args = { user: { ...user, online: true } }

export const Offline = Template.bind({})
Offline.args = { user: { ...user, online: false } }
