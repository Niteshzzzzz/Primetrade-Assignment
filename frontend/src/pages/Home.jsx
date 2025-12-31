import React from 'react'
import { Link } from 'react-router-dom'
import { FaTasks, FaCheckCircle, FaClock, FaLock } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Manage Your Tasks<br />
              <span className="text-indigo-600">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600">
              A simple, elegant, and powerful task management application to boost your productivity.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 text-center shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-300 text-center"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-4 max-w-sm">
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700 font-medium">Organize tasks</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <FaClock className="text-blue-500 text-xl" />
                  <span className="text-gray-700 font-medium">Track progress</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                  <FaLock className="text-orange-500 text-xl" />
                  <span className="text-gray-700 font-medium">Secure & private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Features</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Everything you need to stay productive</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl hover:shadow-lg transition duration-300">
              <div className="bg-indigo-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaTasks className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Task Management</h3>
              <p className="text-gray-600">Create, edit, and delete tasks with a clean and intuitive interface. Stay on top of your to-do list.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-lg transition duration-300">
              <div className="bg-green-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaCheckCircle className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600">Mark tasks as complete and watch your progress grow. Celebrate your achievements with visual feedback.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl hover:shadow-lg transition duration-300">
              <div className="bg-orange-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FaLock className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted and secure. Only you can access your personal tasks and information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to boost your productivity?</h2>
          <p className="text-indigo-100 text-lg mb-8">Join thousands of users managing their tasks efficiently.</p>
          <Link 
            to="/register" 
            className="bg-white text-indigo-600 px-10 py-3 rounded-lg font-bold hover:bg-indigo-50 transition duration-300 inline-block shadow-lg hover:shadow-xl"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 TaskManager. All rights reserved.</p>
          <p className="text-sm mt-2">Built with passion to help you stay productive</p>
        </div>
      </footer>
    </div>
  )
}
