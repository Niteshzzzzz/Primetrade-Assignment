import React from 'react'
import useAuth from '../hooks/useAuth'
import { FaUser, FaEnvelope, FaClock } from 'react-icons/fa'

export default function Profile(){
  const { user } = useAuth()
  
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-3">
          <FaUser className="text-indigo-600" />
          Your Profile
        </h2>
        
        {user ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-400 rounded-full p-6">
                  <FaUser className="text-4xl" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{user.name}</h3>
                  <p className="text-indigo-100">Member</p>
                </div>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <div className="bg-indigo-100 p-4 rounded-lg">
                  <FaEnvelope className="text-indigo-600 text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Email Address</p>
                  <p className="text-lg text-gray-900 font-semibold">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pb-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <FaClock className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Member Since</p>
                  <p className="text-lg text-gray-900 font-semibold">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 p-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="text-indigo-600 font-bold text-3xl">Active</p>
                <p className="text-gray-600 text-sm mt-1">Account Status</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="text-indigo-600 font-bold text-3xl">✓</p>
                <p className="text-gray-600 text-sm mt-1">Verified User</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
            <p className="text-gray-700 text-lg">No user data available. Please log in.</p>
          </div>
        )}
      </div>
    </div>
  )
}
