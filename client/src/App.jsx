import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './themes/theme.js'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import Login from './pages/welcome/Login'
import Signup from './pages/welcome/Signup'
import Messages from './pages/Messages'
import { UserManager } from './context/UserContext'
import { SocketManager } from './context/SocketContext'
import SWRSocketConfig from 'SWRSocketConfig'
import AuthorizedRoute, { unknown } from './AuthorizedRoute'
import CssBaseline from '@material-ui/core/CssBaseline'

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
              <Redirect exact from="/" to="/signup" />
            </Switch>
          </Router>
        </SWRSocketConfig>
      </SocketManager>
    </UserManager>
  </MuiThemeProvider>
)

export default App
