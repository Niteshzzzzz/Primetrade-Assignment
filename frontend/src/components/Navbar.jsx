import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { FaTasks, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-white hover:text-indigo-100 transition">
            <FaTasks className="text-2xl" />
            <span className="hidden sm:inline">TaskManager</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <div className="text-white text-sm">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </div>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  <FaUser className="text-lg" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  <FaSignOutAlt className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-indigo-100 px-4 py-2 font-medium transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-indigo-700 py-4 space-y-2">
            {user ? (
              <>
                <div className="text-white px-4 py-2 text-sm">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </div>
                <Link 
                  to="/profile" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-white hover:bg-indigo-600 px-4 py-2 rounded transition"
                >
                  <FaUser /> Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white hover:bg-indigo-600 px-4 py-2 rounded w-full transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white hover:bg-indigo-600 px-4 py-2 rounded transition"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded font-semibold transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
