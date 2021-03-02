import { createContext, useContext, useEffect, useState } from 'react'
import cookie from 'cookie'

export const UserContext = createContext()

export const UserManager = ({ children }) => {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const login = async (email, password) => {
    try {
      const res = await (
        await fetch('/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: { email, password } }),
        })
      ).json()
      if (res.error) throw res.error
      setUser(res.data.user)
    } catch (err) {
      setError(err)
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await (
        await fetch('/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: { name, email, password } }),
        })
      ).json()
      if (res.error) throw res.error
      setUser(res.data.user)
    } catch (err) {
      setError(err)
    }
  }

  const infoRequest = async () => {
    const res = await (await fetch('/user/info')).json()
    if (res.error) throw res.error
    return res.data.user
  }

  useEffect(() => {
    // Should have gotten the user from the login response,
    // but may have been logged in before, or in another tab
    const isAuthed = cookie.parse(document.cookie).AUTHENTICATED
    if (isAuthed && !user) infoRequest().then(setUser, setError)
  }, [user])

  // XXX fake logout, real token still stored
  const logout = () => {
    setUser()
    return (document.cookie = cookie.serialize('AUTHENTICATED', '', {
      expires: new Date(0),
      SameSite: 'none',
    }))
  }
  return (
    <UserContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
