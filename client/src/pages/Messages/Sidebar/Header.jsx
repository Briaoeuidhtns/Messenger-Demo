import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreHoriz as MenuIcon } from '@material-ui/icons'
import React from 'react'

import UserAvatar from './UserAvatar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },

  name: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  icon: { color: '#95a7c4' },
}))

const Header = ({ user }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <UserAvatar user={user} />
      <Typography variant="h3" noWrap className={classes.name}>
        {user.name}
      </Typography>
      <MenuIcon className={classes.icon} />
    </div>
  )
}

export default Header
