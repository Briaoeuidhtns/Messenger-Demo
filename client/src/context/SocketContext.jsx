import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useUser } from './UserContext'

export const SocketContext = createContext()

export const SocketManager = ({ children }) => {
  const { user } = useUser()
  const [socket] = useState(() => io({ autoConnect: false }))

  useEffect(() => {
    if (user) {
      socket.connect()
      socket.once('connected', (i) => console.log('connected', i))
    }
  }, [user, socket])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
