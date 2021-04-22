import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
import { promisify } from 'util'

import { useUser } from './UserContext'

export const SocketContext = createContext()

export const SocketManager = ({ children }) => {
  const { user } = useUser()
  const [socket] = useState(() => io({ autoConnect: false }))

  useEffect(() => {
    if (user) {
      socket.connect()

      const connected = ['connected', (i) => console.log('connected', i)]
      socket.once(...connected)

      const connect_error = ['connect_error', (err) => console.error(err)]
      socket.on(...connect_error)

      return () => {
        socket.off(...connected)
        socket.off(...connect_error)
      }
    }
  }, [user, socket])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)

export const useFetcher = () => {
  const socket = useSocket()
  return useMemo(() => promisify(socket.emit.bind(socket)), [socket])
}
