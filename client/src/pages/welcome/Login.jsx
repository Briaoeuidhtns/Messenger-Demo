import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from 'context/UserContext'
import { Form, Formik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { loginSchema } from 'schema'

import Base from './Base'
import ButtonHeader from './ButtonHeader'
import Error from './Error'
import Input from './Input'
import SubmitButton from './SubmitButton'

const useStyles = makeStyles((theme) => ({
  forgot: {
    paddingRight: theme.spacing(1.25),
    color: '#3a8dff',
    fontSize: '0.75rem',
    fontWeight: 400,
    textDecoration: 'none',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

const Login = () => {
  const classes = useStyles()
  const { login, error } = useUser()
  const [errorOpen, setErrorOpen] = useState(false)
  useEffect(() => setErrorOpen(!!error), [error])

  const handleErrorClose = useCallback((_event, reason) => {
    if (reason === 'clickaway') return
    setErrorOpen(false)
  }, [])

  return (
    <>
      <Error
        open={errorOpen}
        onClose={handleErrorClose}
        message="Login failed"
      />
      <Base
        welcomeMsg="Welcome back!"
        buttonHeader={
          <ButtonHeader
            label="Don't have an account?"
            buttonText="Create account"
            to="/signup"
          />
        }
      >
        <Formik
          initialValues={loginSchema.getDefault()}
          validationSchema={loginSchema}
          onSubmit={async ({ email, password }) => {
            await login(email, password)
          }}
        >
          <Form className={classes.form}>
            <Input
              label="E-mail address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Input
              label="Password"
              name="password"
              endAdornment={
                // TODO this should link to a reset page, currently blank but included for appearance
                <Typography className={classes.forgot} component="a" href="#">
                  Forgot?
                </Typography>
              }
              type="password"
              autoComplete="current-password"
            />
            <SubmitButton>Login</SubmitButton>
          </Form>
        </Formik>
      </Base>
    </>
  )
}

export default Login
