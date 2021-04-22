import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(2, 4),
    borderRadius: 5,
    boxShadow: '0px 2px 12px rgba(74, 106, 149, 0.2)',
    color: '#3a8dff',
    backgroundColor: '#fff',
    marginRight: theme.spacing(5.25),
  },

  label: {
    color: '#b0b0b0',
    marginRight: theme.spacing(3.75),
  },
  link: { textDecoration: 'none' },
}))

const ButtonHeader = ({ label, buttonText, to }) => {
  const classes = useStyles()

  return (
    <Box
      component={Link}
      to={to}
      className={classes.link}
      display="flex"
      alignSelf="flex-end"
      alignItems="center"
      flexWrap="nowrap"
      pt={3.75}
      pb={11}
    >
      <Typography
        className={classes.label}
        variant="body2"
        component="span"
        noWrap
      >
        {label}
      </Typography>
      <Button className={classes.btn}>{buttonText}</Button>
    </Box>
  )
}

export default ButtonHeader
