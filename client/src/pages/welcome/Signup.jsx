import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useUser } from 'context/UserContext'
import { signupSchema } from 'schema'
import { makeStyles } from '@material-ui/core/styles'
import Error from './Error'
import Input from './Input'
import SubmitButton from './SubmitButton'
import Base from './Base'
import ButtonHeader from './ButtonHeader'

const useStyles = makeStyles((theme) => ({
  form: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
}))

const Signup = () => {
  const classes = useStyles()
  const { register, error } = useUser()
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
        message="Registration failed"
      />
      <Base
        welcomeMsg="Create an account."
        buttonHeader={
          <ButtonHeader
            label="Already have an account?"
            buttonText="Login"
            to="/login"
          />
        }
      >
        <Formik
          initialValues={signupSchema.getDefault()}
          validationSchema={signupSchema}
          onSubmit={async ({ username, email, password }) => {
            await register(username, email, password)
          }}
        >
          <Form className={classes.form}>
            <Input
              name="username"
              label="Username"
              autoComplete="username"
              autoFocus
            />
            <Input name="email" label="E-mail address" autoComplete="email" />
            <Input
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <SubmitButton>Create</SubmitButton>
          </Form>
        </Formik>
      </Base>
    </>
  )
}

export default Signup
