const asyncHandler = require('./asyncHandler')
const express = require('express')
const { User } = require('../schema/User')
const { hash } = require('bcrypt')

const router = express.Router()

/** The bcrypt default salt difficulty */
const saltRounds = 10

const validPassword = (pw) => pw.length >= 6

router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const {
      user: { password, ...user },
    } = req.body

    if (validPassword(password)) {
      await User.create({
        ...user,
        password: await hash(password, saltRounds),
      })
      res.status(201).send({ data: { kind: 'success' } })
    } else {
      res.status(400).send({ error: { kind: 'invalid password' } })
    }
  })
)

module.exports = router
