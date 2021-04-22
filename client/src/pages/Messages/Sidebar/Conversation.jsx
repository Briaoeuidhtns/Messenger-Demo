import {
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import UserAvatar from './UserAvatar'

const StandaloneBadge = withStyles({
  badge: {
    transform: 'initial',
    transformOrigin: 'initial',
    position: 'initial',
  },
})(Badge)

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(1),
    '&:not(:last-child)': { marginBottom: theme.spacing(1) },
  },

  unread: {
    right: theme.spacing(2.5),
    paddingLeft: theme.spacing(4),
  },
}))

const Conversation = ({ user, unread = 0, lastMessage, onClick }) => {
  const classes = useStyles()
  return (
    <ListItem className={classes.root} button {...{ onClick }}>
      <ListItemAvatar>
        <UserAvatar {...{ user }} />
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        primaryTypographyProps={{ noWrap: true }}
        secondary={lastMessage}
        secondaryTypographyProps={{
          noWrap: true,
          color: unread ? 'textPrimary' : 'textSecondary',
        }}
      />
      <StandaloneBadge
        badgeContent={unread}
        color="primary"
        className={classes.unread}
      />
    </ListItem>
  )
}

export default Conversation
