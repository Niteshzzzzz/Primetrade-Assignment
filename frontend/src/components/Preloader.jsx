import React from 'react'
import { FaSpinner, FaTasks } from 'react-icons/fa'

export default function Preloader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo with spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
            <div className="text-4xl text-indigo-600 animate-bounce">
              <FaTasks />
            </div>
          </div>
          
          {/* Spinner ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-400 animate-spin"></div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">TaskManager</h2>
          <div className="flex items-center justify-center gap-1">
            <p className="text-gray-600">Loading</p>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>

        {/* Loading message */}
        <p className="text-sm text-gray-500">Please wait while we prepare your workspace...</p>
      </div>
    </div>
  )
}
