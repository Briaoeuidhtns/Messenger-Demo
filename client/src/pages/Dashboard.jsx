import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function Dashboard() {
  const history = useHistory()
  const { user, logout } = useUser()

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(user)}</p>
      <button
        onClick={() => {
          logout()
          history.push('/login')
        }}
      >
        Logout
      </button>
    </>
  )
}
