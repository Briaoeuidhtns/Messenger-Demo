import React, { useEffect } from 'react'
import { useFetcher } from './context/SocketContext'
import { SWRConfig, mutate } from 'swr'

import { useSocket } from 'context/SocketContext'

/**
 * SWR config with a fetcher that uses socket.io from `useSocket`, and sends
 * requests with a nodeback style ack.
 *
 * Also registers for and reconciles socket.io events representing state transitions to swr cache mutations.
 */
const SWRSocketConfig = ({ children, config }) => {
  const socket = useSocket()
  const fetcher = useFetcher()

  useEffect(() => {
    const handlers = [
      [
        'new_message',
        (msg) => {
          mutate(
            ['get_conversation_messages', msg.to],
            async (messages = []) => {
              return [...messages, msg]
            },
            false
          )
        },
      ],
      // TODO Events for all the other transitions (online, new conversation, etc)
    ]

    handlers.map((h) => socket.on(...h))

    return () => {
      handlers.map((h) => socket.off(...h))
    }
  }, [socket])

  return (
    <SWRConfig
      value={{
        // By default use events to handle revalidate
        revalidateOnFocus: false,
        ...config,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRSocketConfig
