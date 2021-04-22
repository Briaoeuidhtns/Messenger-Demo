import { AppBar, Box, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'

import Chat from './Chat'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', height: '100vh' },
  appBar: {
    boxShadow: '0px 2px 20px rgba(88, 133, 196, 0.1)',
    padding: theme.spacing(4, 0, 4, 3),
  },
}))

const Messages = () => {
  const classes = useStyles()

  const [active, setActive] = useState()

  return (
    <Box className={classes.root}>
      <Sidebar active={active} setActive={setActive} />
      <Box display="flex" flex={1} flexDirection="column">
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          className={classes.appBar}
        >
          <Typography variant="h2">{active?.members?.[0]?.name}</Typography>
        </AppBar>
        <Chat conversation={active} />
      </Box>
    </Box>
  )
}

export default Messages
