import React, { useMemo } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './themes/theme.js'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import { UserManager } from './context/UserContext'
import { SocketManager, useSocket } from './context/SocketContext'
import AuthorizedRoute, { unknown } from './AuthorizedRoute'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SWRConfig } from 'swr'
import { promisify } from 'util'

import './App.css'

/**
 * SWR config with a fetcher that uses socket.io from `useSocket`, and sends
 * requests with a nodeback style ack
 */
const SWRSocketConfig = ({ children, config }) => {
  const socket = useSocket()
  const fetcher = useMemo(() => promisify(socket.emit.bind(socket)), [socket])
  return <SWRConfig value={{ ...config, fetcher }}>{children}</SWRConfig>
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UserManager>
      <SocketManager>
        <SWRSocketConfig>
          <Router>
            <Switch>
              <AuthorizedRoute
                path="/login"
                allow={unknown}
                fallbackPath="/messages"
              >
                <Login />
              </AuthorizedRoute>
              <AuthorizedRoute
                path="/signup"
                allow={unknown}
                fallbackPath="/messages"
              >
                <Signup />
              </AuthorizedRoute>
              <AuthorizedRoute path="/messages">
                <Messages />
              </AuthorizedRoute>
              <AuthorizedRoute path="/dashboard">
                <Dashboard />
              </AuthorizedRoute>
              <Redirect exact from="/" to="/signup" />
            </Switch>
          </Router>
        </SWRSocketConfig>
      </SocketManager>
    </UserManager>
  </MuiThemeProvider>
)

export default App
