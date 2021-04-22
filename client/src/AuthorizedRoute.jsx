import { Redirect, Route, useLocation } from 'react-router-dom'

import { useUser } from './context/UserContext'

export const known = (user) => !!user
export const unknown = (user) => !known(user)
export const all = () => true
export const none = () => false

/**
 * A `Route` that redirects to `fallbackPath` if `allow` returns false.
 *
 * Defaults to allowing all known users, and redirecting to `/signup` if not authorized
 *
 * Only intended to handle children as children elements.
 */
const AuthorizedRoute = ({
  allow = known,
  fallbackPath = '/signup',
  children,
  ...props
}) => {
  const location = useLocation()
  const { user } = useUser()

  return (
    <Route {...props}>
      {allow(user) ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: fallbackPath,
            state: { referrer: location },
          }}
        />
      )}
    </Route>
  )
}

export default AuthorizedRoute
