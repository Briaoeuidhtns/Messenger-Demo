import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  submit: {
    padding: theme.spacing(2, 7.25),
    borderRadius: 3,
    marginTop: theme.spacing(6.5),
  },
}))

const SubmitButton = ({ children }) => {
  const classes = useStyles()
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      color="primary"
      className={classes.submit}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
