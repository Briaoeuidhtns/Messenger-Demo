import React, { useEffect, useState, useMemo } from 'react'
import { useSocket } from 'context/SocketContext'
import { AppBar, Box, makeStyles, Typography } from '@material-ui/core'
import Chat from './Chat'
import Sidebar from './Sidebar'
import { useCache } from 'context/Cache'

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', height: '100vh' },
  appBar: {
    boxShadow: '0px 2px 20px rgba(88, 133, 196, 0.1)',
    padding: theme.spacing(4, 0, 4, 3),
  },
}))

const Messages = () => {
  const classes = useStyles()
  const socket = useSocket()

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [active, setActive] = useState()
  const user = useCache(useMemo(() => [active], [active]))[active] ?? {}

  useEffect(() => {
    let active = true
    socket.emit('get_conversations', searchValue, (res) => {
      if (active) setSearchResults(res)
    })
    return () => {
      active = false
    }
  }, [searchValue, socket])

  return (
    <Box className={classes.root}>
      <Sidebar
        conversations={searchResults}
        search={searchValue}
        setSearch={setSearchValue}
        onSelect={setActive}
      />
      <Box display="flex" flex={1} flexDirection="column">
        <AppBar
          position="static"
          color="inherit"
          elevation={0}
          className={classes.appBar}
        >
          <Typography variant="h2">{user.name}</Typography>
        </AppBar>
        <Chat conversation={active} />
      </Box>
    </Box>
  )
}

export default Messages
