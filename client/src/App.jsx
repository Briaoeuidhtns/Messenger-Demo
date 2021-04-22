import { MuiThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import SWRSocketConfig from 'SWRSocketConfig'

import AuthorizedRoute, { unknown } from './AuthorizedRoute'
import { SocketManager } from './context/SocketContext'
import { UserManager } from './context/UserContext'
import Messages from './pages/Messages'
import Login from './pages/welcome/Login'
import Signup from './pages/welcome/Signup'
import { theme } from './themes/theme.js'

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
