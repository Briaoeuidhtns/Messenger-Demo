import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core'
import useSWR from 'swr'

const Messages = () => {
  const socket = useSocket()
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    const new_message = [
      'new_message',
      (msg) => setMessages((m) => [...m, msg]),
    ]

    socket.on(...new_message)
    const connect_error = ['connect_error', (err) => console.error(err)]
    socket.on(...connect_error)
    return () => {
      socket.off(...new_message)
      socket.off(...connect_error)
    }
  }, [socket])

  const [to, setTo] = useState('')
  const [toSelected, setToSelected] = useState()
  const { data: toOpts } = useSWR(['find_user', to])

  return (
    <div>
      <div>
        <TextField
          label="Send to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <List value={toOpts}>
          {toOpts?.map((o) => (
            <ListItem
              button
              selected={toSelected === o._id}
              onClick={() => setToSelected(o._id)}
              key={o._id}
            >
              <ListItemText primary={o.name} secondary={o.email} />
            </ListItem>
          ))}
        </List>
      </div>
      <TextField
        label="Message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        onClick={() => {
          socket.emit('send_message', { to: toSelected, content })
        }}
      >
        Send
      </Button>
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
