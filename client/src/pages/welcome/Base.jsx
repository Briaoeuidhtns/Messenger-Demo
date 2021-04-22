import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  welcome: { paddingBottom: theme.spacing(2.5) },
}))

const Base = ({ welcomeMsg, buttonHeader, children }) => {
  const classes = useStyles()

  return (
    <Box display="flex" component="main" height="100vh">
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1}>
        {buttonHeader}
        <Box px={3} alignSelf="center" width={386}>
          <Typography className={classes.welcome} variant="h1">
            {welcomeMsg}
          </Typography>
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Base
