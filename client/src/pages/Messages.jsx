import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext'

const Messages = () => {
  const socket = useSocket()
  const [messages, setMessages] = useState([])
  const [to, setTo] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const new_message = [
      'new_message',
      (msg) => {
        console.log('new_message', msg)
        setMessages((m) => [...m, msg])
      },
    ]
    socket.on(...new_message)
    const connect_error = ['connect_error', (err) => console.error(err)]
    socket.on(...connect_error)
    window.io = socket
    return () => {
      socket.off(...new_message)
      socket.off(...connect_error)
    }
  }, [socket])

  return (
    <div>
      <label>
        To: <input value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <label>
        Message:{' '}
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button
        onClick={() => {
          socket.emit('send_message', { to, content })
        }}
      >
        Send
      </button>
      <ol>
        {messages.map((m, key) => (
          <li key={key}>
            {m.from}: {m.content}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Messages
