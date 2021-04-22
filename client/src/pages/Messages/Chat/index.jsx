import { makeStyles } from '@material-ui/core'
import { Box, InputBase } from '@material-ui/core'
import { useSocket } from 'context/SocketContext'
import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import Bubble from './Bubble'

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

  const { data: messages } = useSWR(
    conversation && ['get_conversation_messages', conversation._id]
  )

  const onSendMessage = () => {
    const msg = { content: msgValue, to: conversation }
    socket.emit('send_message', msg)
  }

  const msgEndScrollMarker = useRef()
  // Don't smooth scroll while initially loading a conversation
  const prevConversation = useRef()
  const scrollToBottom = () => {
    // Don't scroll until done rerendering from everything loading
    if (msgEndScrollMarker.current && conversation && messages) {
      msgEndScrollMarker.current.scrollIntoView({
        behavior: prevConversation.current === conversation ? 'smooth' : 'auto',
      })
      prevConversation.current = conversation
    }
  }
  useEffect(scrollToBottom, [messages, conversation])

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
        {messages?.map(({ content, from, createdAt }, idx) => (
          <Bubble
            key={idx}
            value={content}
            sender={conversation.members.find((u) => u._id === from)}
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
