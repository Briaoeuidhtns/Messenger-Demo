import React from 'react'
import { Box, Hidden, Grid, Typography, SvgIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ReactComponent as MessageSvg } from './Message.svg'

const MessageIcon = (props) => (
  <SvgIcon {...props} component={MessageSvg} viewBox="0 0 68 67" />
)

const useStyles = makeStyles({
  image: {
    backgroundImage: 'url(./images/bg-img.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  overlay: {
    backgroundImage:
      'linear-gradient(rgb(58, 141, 255, 0.75), rgb(134, 185, 255, 0.75))',
  },

  heroText: {
    textAlign: 'center',
    marginTop: 30,
    maxWidth: 300,
    fontWeight: 400,
    color: '#fff',
  },

  icon: {
    fontSize: 67,
  },
})

const Sidebar = () => {
  const classes = useStyles()
  return (
    <Grid item xs={false} sm={4} md={5} className={classes.image}>
      <Box
        className={classes.overlay}
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box height="30vh" flexShrink={1} />
        <Hidden xsDown>
          <MessageIcon className={classes.icon} />
          <Hidden smDown>
            <Typography className={classes.heroText} variant="h1">
              Converse with anyone with any language
            </Typography>
          </Hidden>
        </Hidden>
      </Box>
    </Grid>
  )
}

export default Sidebar
