const { User } = require('../schema/User')
const asyncHandler = require('./asyncHandler')
const express = require('express')
const { sign } = require('jsonwebtoken')
const { compare } = require('bcrypt')

const configure = ({ key, jwtOpts, cookie }) => {
  const router = express.Router()

  router.post(
    '/login',
    asyncHandler(async (req, res, next) => {
      const {
        user: { email, password },
      } = req.body

      const realHash = (await User.findOne({ email }, 'password').exec())
        ?.password

      if (realHash && (await compare(password, realHash))) {
        res
          .status(200)
          .cookie(cookie, sign({ data: { email } }, key, jwtOpts), {
            httpOnly: true,
          })
          .send({ data: { kind: 'success' } })
      } else {
        res.status(401).send({ error: { kind: 'invalid credentials' } })
      }
    })
  )
  return router
}

module.exports = configure
