const { User } = require('../schema/User')
const asyncHandler = require('./asyncHandler')
const express = require('express')
const { sign } = require('jsonwebtoken')
const { compare } = require('bcrypt')

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
        .cookie(
          'SESSION_TOKEN',
          sign({ data: { email } }, process.env.JWT_PRIVATE_KEY, {
            algorithm: process.env.JWT_ALG,
          }),
          { httpOnly: true }
        )
        .send({ data: { kind: 'success' } })
    } else {
      res.status(401).send({ error: { kind: 'invalid credentials' } })
    }
  })
)

module.exports = router
