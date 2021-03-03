const asyncHandler = require('./asyncHandler')
const express = require('express')
const mongoose = require('mongoose')
const { User } = require('../schema/User')
const { hash } = require('bcrypt')
const sendUserInfo = require('../middleware/sendUserInfo')
const addJwtCookie = require('../middleware/addJwtCookie')

/** The bcrypt default salt difficulty */
const saltRounds = 10

const validPassword = (pw) => {
  const createError = (msg) => {
    // Use mongoose errors for consistent handling
    const err = new mongoose.Error.ValidationError()
    err.errors = {
      // Fake path so we can filter out password errors from mongoose
      safepassword: new mongoose.Error.ValidatorError({
        type: 'custom',
        path: 'safepassword',
        message: msg,
      }),
    }
    return err
  }

  if (pw.length < 6) {
    throw createError('Password too short')
  }
  return pw
}

const router = (config) =>
  express.Router().post(
    '/register',
    asyncHandler(async (req, res, next) => {
      const {
        user: { password, ...userRegistration },
      } = req.body

      try {
        req.user.data = await User.create({
          ...userRegistration,
          password: await hash(validPassword(password), saltRounds),
        })

        res.status(201)
        next()
      } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
          const { password, ...errors } = err.errors
          // Shouldn't ever be errors from mongoose validation in pw,
          // but if there are it's a server error
          if (password) throw password
          res.status(400).send({
            error: {
              kind: 'validation',
              items: Object.fromEntries(
                Object.entries(errors).map(([p, e]) => [p, e.message])
              ),
            },
          })
        } else throw err
      }
    }),
    addJwtCookie(config),
    sendUserInfo
  )

module.exports = router
