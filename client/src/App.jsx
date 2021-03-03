import React from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from './themes/theme.js'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { UserManager } from './context/UserContext'
import AuthorizedRoute, { unknown } from './AuthorizedRoute'
import CssBaseline from '@material-ui/core/CssBaseline'
import SidebarPage from './SidebarPage'

import './App.css'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <UserManager>
      <Router>
        <Switch>
          <AuthorizedRoute
            path="/login"
            allow={unknown}
            fallbackPath="/dashboard"
          >
            <Login />
          </AuthorizedRoute>
          <AuthorizedRoute
            path="/signup"
            allow={unknown}
            fallbackPath="/dashboard"
          >
            <Signup />
          </AuthorizedRoute>
          <AuthorizedRoute path="/dashboard">
            <Dashboard />
          </AuthorizedRoute>
          <Route path="/test">
            <SidebarPage />
          </Route>
          <Redirect exact from="/" to="/signup" />
        </Switch>
      </Router>
    </UserManager>
  </MuiThemeProvider>
)

export default App
