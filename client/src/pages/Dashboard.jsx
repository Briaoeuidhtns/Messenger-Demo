import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
  const history = useHistory()

  React.useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) history.push('/signup')
  }, [history])

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(localStorage.getItem('user'))}</p>
      <button
        onClick={() => {
          localStorage.removeItem('user')
          history.push('/login')
        }}
      >
        Logout
      </button>
    </>
  )
}
