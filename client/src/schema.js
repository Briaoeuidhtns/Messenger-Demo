import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .ensure()
    .required('Email is required')
    .email('Email is not valid'),
  password: Yup.string()
    .ensure()
    .required('Password is required')
    .max(100, 'Password is too long')
    .min(6, 'Password too short'),
})

export const signupSchema = loginSchema.shape({
  username: Yup.string()
    .ensure()
    .required('Username is required')
    .max(40, 'Username is too long'),
})
