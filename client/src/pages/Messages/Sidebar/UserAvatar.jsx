import { Avatar, Badge } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
  const borderWidth = 2
  const size = theme.spacing(1.5)
  return {
    badge: {
      backgroundColor: ({ status }) =>
        ({ online: '#1CED84', offline: '#D0DAE9' }[status]),
      border: 'solid #FFF',
      borderWidth,
      height: size,
      minWidth: size,
      borderRadius: '50%',
    },
  }
})

const UserAvatar = ({ user }) => {
  const status = user.online ? 'online' : 'offline'
  const classes = useStyles({ status })

  return (
    <Badge
      variant="dot"
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      aria-label={status}
      classes={{ badge: classes.badge }}
    >
      <Avatar src={user.img} />
    </Badge>
  )
}

export default UserAvatar
