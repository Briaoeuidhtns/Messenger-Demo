import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, ListItem, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    container: {
      flexDirection: ({ isSender }) => (isSender ? 'row-reverse' : 'row'),
      alignItems: 'flex-start',
    },
    background: {
      background: ({ isSender }) =>
        isSender ? '#F4F6FA' : 'linear-gradient(225deg, #6CC1FF, #3A8DFF)',
      borderRadius: 10,
      borderTopLeftRadius: ({ isSender }) => (isSender ? undefined : 0),
      borderBottomRightRadius: ({ isSender }) => (isSender ? 0 : undefined),
      padding: theme.spacing(1, 2),
    },
    text: {
      color: ({ isSender }) => (isSender ? '#91A3C0' : '#FFFFFF'),
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1.5),
      marginTop: theme.spacing(1.5),
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: ({ isSender }) => (isSender ? 'flex-end' : 'flex-start'),
      [theme.breakpoints.up('sm')]: {
        maxWidth: 'min(75%, 100ch)',
      },
    },
    timestamp: {
      color: '#BECCE2',
    },
  }
})

const isSameDate = (a, b = new Date()) =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear()

const todayFormat = Intl.DateTimeFormat(undefined, { timeStyle: 'short' })
const exactFormat = Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
  timeStyle: 'short',
})
const formatTimestamp = (date) =>
  (isSameDate(date) ? todayFormat : exactFormat).format(date)

const Bubble = ({ sender, value, sendTime }) => {
  const classes = useStyles({ isSender: !sender })
  return (
    <ListItem className={classes.container} disableGutters>
      {sender && <Avatar src={sender.img} className={classes.avatar} />}
      <Box className={classes.content}>
        <Typography className={classes.timestamp} variant="caption">
          {sender && (sender.name ?? 'unknown') + ' '}
          {formatTimestamp(new Date(sendTime))}
        </Typography>
        <Box className={classes.background}>
          <Typography className={classes.text} variant="body1">
            {value}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  )
}

export default Bubble
