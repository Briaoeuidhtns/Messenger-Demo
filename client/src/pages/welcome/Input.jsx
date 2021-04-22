import { TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useField } from 'formik'
import { uniqueId } from 'lodash'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  label: {
    color: 'rgb(0, 0, 0, 0.4)',
    paddingLeft: 5,
  },

  inputs: {
    paddingLeft: 5,
  },

  inputRoot: {
    paddingTop: theme.spacing(2.5),
  },

  underline: {
    '&::before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  formControlLabel: { transform: 'none' },
}))

const Input = ({ label, endAdornment, ...props }) => {
  const classes = useStyles()
  const [field, { touched, error }] = useField(props)
  const [id] = useState(() => uniqueId(props.name))

  return (
    <TextField
      id={id}
      label={
        <Typography variant="body2" component="span" className={classes.label}>
          {label}
        </Typography>
      }
      fullWidth
      margin="normal"
      InputLabelProps={{
        classes: { formControl: classes.formControlLabel },
      }}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.inputs,
          underline: classes.underline,
        },
        endAdornment,
      }}
      {...props}
      {...field}
      error={!!(touched && error)}
      helperText={touched && error?.toString()}
    />
  )
}

export default Input
