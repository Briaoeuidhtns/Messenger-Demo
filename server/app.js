const createError = require('http-errors')
const express = require('express')
const { join } = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { jwtCookieParser } = require('./middleware/auth')
const { requireUser } = require('./middleware/auth')
const sendUserInfo = require('./middleware/sendUserInfo')
const clearCookies = require('./middleware/clearCookies')
const { User } = require('./schema/User')

const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

const { json, urlencoded, Router } = express

const app = express()

const JWT_COOKIE_NAME = 'SESSION_TOKEN'

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(__dirname, 'public')))

app.use(
  jwtCookieParser({
    cookie: JWT_COOKIE_NAME,
    key: process.env.JWT_PRIVATE_KEY,
    jwtOpts: { algorithms: [process.env.JWT_ALG] },
    convert: User.fromClaim.bind(User),
  })
)

const tokenSettings = {
  cookie: JWT_COOKIE_NAME,
  key: process.env.JWT_PRIVATE_KEY,
  jwtOpts: { algorithm: process.env.JWT_ALG, expiresIn: '1h' },
}
app.use(
  '/user',
  loginRouter(tokenSettings),
  registerRouter(tokenSettings),
  Router().get('/info', requireUser, sendUserInfo),
  Router().post(
    '/logout',
    clearCookies(JWT_COOKIE_NAME, 'AUTHENTICATED'),
    (_, res) => res.status(200).send()
  )
)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.error(err)

  // render the error page
  res.status(err.status || 500)
  res.json({ error: err })
})

module.exports = app
