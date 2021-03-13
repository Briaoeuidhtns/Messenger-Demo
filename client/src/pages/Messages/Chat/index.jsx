import React, { useEffect, useMemo, useRef, useState } from 'react'

import { makeStyles } from '@material-ui/core'

import Bubble from './Bubble'
import { Box, InputBase } from '@material-ui/core'
import { useUser } from 'context/UserContext'
import { useCache } from 'context/Cache'
import { useSocket } from 'context/SocketContext'

const useStyles = makeStyles((theme) => ({
  inputInput: {
    color: '#000000',
    '&::placeholder': {
      color: '#ADC0DE',
      opacity: 1,
    },
    padding: theme.spacing(4.5, 3.5),
  },
  scroll: { overflowY: 'auto' },
  noMinHeight: { minHeight: 0 },
}))

const Chat = ({ conversation }) => {
  const classes = useStyles()
  const socket = useSocket()
  const [msgValue, setMsgValue] = useState('')
  const me = useUser()

  const [messages, setMessages] = useState([])
  const ids = useMemo(() => new Set(messages.map((m) => m.from)), [messages])
  const userInfo = useCache(ids)

  const onSendMessage = () => {
    const msg = { content: msgValue, to: conversation }
    socket.emit('send_message', msg)
    setMessages((m) => [...m, { ...msg, from: me._id, createdAt: new Date() }])
  }

  useEffect(() => setMessages([]), [conversation])

  useEffect(() => {
    const new_message = [
      'new_message',
      (msg) => {
        if (msg.from === conversation) setMessages((m) => [...m, msg])
      },
    ]
    socket.on(...new_message)
    return () => {
      socket.off(...new_message)
    }
  }, [conversation, socket])

  const msgEndScrollMarker = useRef()
  const scrollToBottom = () =>
    msgEndScrollMarker.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(scrollToBottom, [messages])

  return (
    <Box
      display="flex"
      flexDirection="column"
      m={5}
      mt={4}
      flex={1}
      justifyContent="flex-end"
      className={classes.noMinHeight}
    >
      <Box className={classes.scroll} component="ol" p={0} m={0}>
        {messages.map(({ content, from, createdAt }, idx) => (
          <Bubble
            key={idx}
            value={content}
            sender={from === me._id ? undefined : userInfo[from] ?? {}}
            sendTime={createdAt}
          />
        ))}
        <Box ref={msgEndScrollMarker} />
      </Box>
      <Box
        bgcolor="#E9EEF9"
        borderRadius={5}
        component="form"
        onSubmit={(e) => {
          e.preventDefault()
          const m = msgValue.trim()
          if (m) {
            onSendMessage(m)
            setMsgValue('')
          }
        }}
        mt={5}
      >
        <InputBase
          value={msgValue}
          fullWidth
          onChange={(e) => setMsgValue(e.target.value)}
          placeholder="Type something..."
          classes={{ input: classes.inputInput }}
          disabled={conversation == null}
        />
      </Box>
    </Box>
  )
}

export default Chat
