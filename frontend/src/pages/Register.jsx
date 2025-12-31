import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getEmailError, getPasswordError } from '../utils/validators'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!name || name.trim().length === 0) {
      newErrors.name = 'Name is required'
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    const emailError = getEmailError(email)
    if (emailError) newErrors.email = emailError
    
    const passwordError = getPasswordError(password)
    if (passwordError) newErrors.password = passwordError
    
    return newErrors
  }

  const submit = async (e) => {
    e.preventDefault()
    setServerError('')
    
    const newErrors = validateForm()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) return

    try {
      setLoading(true)
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setServerError(err.response?.data?.message || err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      
      <form onSubmit={submit} className="bg-white p-6 rounded shadow">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input 
            value={name} 
            onChange={e => {
              setName(e.target.value)
              if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
            }} 
            className={`w-full p-2 border rounded ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={loading}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input 
            value={email} 
            onChange={e => {
              setEmail(e.target.value)
              if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
            }} 
            className={`w-full p-2 border rounded ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={loading}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        {/* Password Field */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Password</label>
          <input 
            value={password} 
            type="password" 
            onChange={e => {
              setPassword(e.target.value)
              if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
            }} 
            className={`w-full p-2 border rounded ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            disabled={loading}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          {password.length > 0 && !errors.password && (
            <p className="text-green-600 text-sm mt-1">✓ Password valid</p>
          )}
          <p className="text-gray-500 text-xs mt-1">Password must be at least 6 characters</p>
        </div>
        
        <button 
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
