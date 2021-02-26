#!/usr/bin/env node

require('dotenv').config({ debug: process.env.DEBUG })

const app = require('../app')
const http = require('http')
const mongoose = require('mongoose')
const { User } = require('../schema/User')

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

/**
 * Adapt Server.listen into a promise
 */
const listen = (server, port) =>
  new Promise((resolve, reject) => {
    server
      .once('listening', () => resolve(server))
      .once('error', reject)
      .listen(port)
  })

const run = async () => {
  // Mongoose init
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Ensure indexes are created first
  await User.init()

  mongoose.connection.on('error', (err) => console.error(err))

  // Server init
  const port = normalizePort(process.env.PORT || '3001')
  app.set('port', port)

  try {
    const server = await listen(http.createServer(app), port)

    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    console.log('Listening on ' + bind)
  } catch (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
      default:
        throw error
    }
  }
}

run()
