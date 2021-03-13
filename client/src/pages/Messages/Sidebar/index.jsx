import React, { useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { List, Box, Typography, InputBase, SvgIcon } from '@material-ui/core'

import Conversation from './Conversation'
import Header from './Header'
import { ReactComponent as SearchSvg } from './Search.svg'
import { useUser } from 'context/UserContext'
import { useCache } from 'context/Cache'

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
    backgroundColor: '#F5F7FB',
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
    backgroundColor: '#E9EEF9',
    borderRadius: 5,
    color: '#ADC0DE',
  },
  searchRoot: { color: 'inherit', width: '100%' },
  searchInput: {
    padding: theme.spacing(2),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: '#000000',
    '&::placeholder': {
      color: '#ADC0DE',
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

const Sidebar = ({ conversations, search, setSearch, onSelect }) => {
  const classes = useStyles()
  const me = useUser()
  const userIds = useMemo(() => conversations.map(({ user }) => user), [
    conversations,
  ])
  const userInfo = useCache(userIds)

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
        {conversations.map(({ user, ...props }, idx) => (
          <Conversation
            user={userInfo[user] ?? {}}
            {...props}
            key={idx}
            onClick={() => onSelect(user)}
          />
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
