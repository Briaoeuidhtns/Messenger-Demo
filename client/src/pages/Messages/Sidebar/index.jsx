import { Box, InputBase, List, SvgIcon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFetcher } from 'context/SocketContext'
import { useUser } from 'context/UserContext'
import React, { useState } from 'react'
import useSWR from 'swr'

import Conversation from './Conversation'
import Header from './Header'
import { ReactComponent as SearchSvg } from './Search.svg'

const SearchIcon = (props) => (
  <SvgIcon
    {...props}
    component={SearchSvg}
    viewBox="0 0 12 12"
    titleAccess="Search"
  />
)

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f7fb',
    padding: theme.spacing(3),
    paddingBottom: 0,
    // TODO probably shouldn't be fixed, maybe collapse on small screens?
    width: 300,
  },
  title: { marginBottom: theme.spacing(1.5) },

  search: {
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing(2.5),
    backgroundColor: '#e9eef9',
    borderRadius: 5,
    color: '#adc0de',
  },

  searchRoot: {
    color: 'inherit',
    width: '100%',
  },

  searchInput: {
    padding: theme.spacing(2),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: '#000',

    '&::placeholder': {
      color: '#adc0de',
      opacity: 1,
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Sidebar = ({ active, setActive }) => {
  const classes = useStyles()
  const fetcher = useFetcher()
  const { user: me } = useUser()

  const [search, setSearch] = useState('')

  const { data: searchResults } = useSWR(search && ['find_user', search])

  const { data: conversations, mutate: mutateConversations } = useSWR(
    'get_conversations',
    // No change events for this data yet, reenable to keep fresher
    { revalidateOnFocus: true }
  )

  const onSelectSearchResult = async (selected) =>
    await mutateConversations(async (prev = []) => {
      setSearch('')
      const conversation = await fetcher('get_conversation_by_users', [
        selected,
      ])
      setActive(conversation)

      return [conversation, ...prev.filter((c) => c._id !== conversation._id)]
    })

  return (
    <Box className={classes.root}>
      <Header user={me} />
      <Typography variant="h2" className={classes.title}>
        Chats
      </Typography>
      <Box className={classes.search}>
        <Box className={classes.searchIcon}>
          <SearchIcon fontSize="inherit" />
        </Box>
        <InputBase
          placeholder="Search"
          classes={{ root: classes.searchRoot, input: classes.searchInput }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <List disablePadding>
        {search
          ? searchResults?.map((user, idx) => (
              <Conversation
                user={user}
                key={idx}
                onClick={() => onSelectSearchResult(user._id)}
              />
            ))
          : conversations?.map((c, idx) => (
              <Conversation
                user={c.members[0]}
                lastMessage={c.lastMessage}
                key={idx}
                onClick={() => setActive(c)}
              />
            ))}
      </List>
    </Box>
  )
}

export default Sidebar
