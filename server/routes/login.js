const { User } = require('../schema/User')
const asyncHandler = require('./asyncHandler')
const express = require('express')
const { compare } = require('bcrypt')
const sendUserInfo = require('../middleware/sendUserInfo')
const addJwtCookie = require('../middleware/addJwtCookie')

const configure = (config) =>
  express.Router().post(
    '/login',
    asyncHandler(async (req, res, next) => {
      const {
        user: { email, password },
      } = req.body

      const realUser = await User.findOne({ email }).exec()
      const realHash = realUser?.password
      if (realHash && (await compare(password, realHash))) {
        req.user = { data: realUser }
        next()
      } else {
        res.status(401).send({ error: { kind: 'invalid credentials' } })
      }
    }),
    addJwtCookie(config),
    sendUserInfo
  )

module.exports = configure
