import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api.js'
import Preloader from '../components/Preloader.jsx'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current user info from backend using the cookie
        const { data } = await api.get('/users/profile')
        setUser(data)
      } catch (error) {
        // Not authenticated or token expired
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser({ _id: data._id, name: data.name, email: data.email })
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    setUser({ _id: data._id, name: data.name, email: data.email })
    return data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  if (loading) {
    return <Preloader />
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
